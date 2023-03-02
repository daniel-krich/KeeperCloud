using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Application.Common.Security.Attributes;
using Keeper.Application.RepositoryMembers.Exceptions;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Application.RepositoryMembers.Queries.GetRepositoryMember;

[AuthorizedUserRequest]
public record GetRepositoryMemberQuery : IRequest<RepositoryApiMemberModel>
{
    public Guid RepositoryId { get; set; }
    public Guid MemberId { get; set; }
}

public class GetRepositoryMemberQueryHandler : IRequestHandler<GetRepositoryMemberQuery, RepositoryApiMemberModel>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;

    public GetRepositoryMemberQueryHandler(IKeeperDbContextFactory keeperFactory, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<RepositoryApiMemberModel> Handle(GetRepositoryMemberQuery request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repositoryApiMember = await context.Repositories.Where(x => x.OwnerId == user.Id && x.Id == request.RepositoryId).Select(x => x.ApiMembers.FirstOrDefault(y => y.Id == request.MemberId)).FirstOrDefaultAsync();
            if (repositoryApiMember == null)
                throw new RepositoryMemberNotFoundException();
            return _mapper.Map<RepositoryApiMemberModel>(repositoryApiMember);
        }
    }
}