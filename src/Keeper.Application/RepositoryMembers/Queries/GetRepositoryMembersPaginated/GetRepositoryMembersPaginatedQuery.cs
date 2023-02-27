using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Application.RepositoryMembers.Queries.GetRepositoryMembersPaginated;

[AuthorizedRequest]
public record GetRepositoryMembersPaginatedQuery : IRequest<PaginationWrapperModel<RepositoryApiMemberModel>>
{
    public Guid RepositoryId { get; set; }
    public int Page { get; set; }
}

public class GetRepositoryMembersPaginatedQueryHandler : IRequestHandler<GetRepositoryMembersPaginatedQuery, PaginationWrapperModel<RepositoryApiMemberModel>>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;

    private const int MaxRecordsPerPage = 20;

    public GetRepositoryMembersPaginatedQueryHandler(IKeeperDbContextFactory keeperFactory, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<PaginationWrapperModel<RepositoryApiMemberModel>> Handle(GetRepositoryMembersPaginatedQuery request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;

            var repository = await context.Repositories.Include(x => x.ApiMembers.OrderByDescending(y => y.CreatedDate)
                                                                    .Skip((request.Page - 1) * MaxRecordsPerPage)
                                                                    .Take(MaxRecordsPerPage)
                                     ).FirstOrDefaultAsync(x => x.Id == request.RepositoryId && x.OwnerId == user.Id);

            if (repository != null)
            {
                var repositoryApiMembersAllCount = await context.RepositoryApiMembers.Where(x => x.RepositoryId == request.RepositoryId).CountAsync();
                var membersModel = _mapper.Map<List<RepositoryApiMemberModel>>(repository.ApiMembers);
                return new PaginationWrapperModel<RepositoryApiMemberModel>(membersModel, request.Page, Convert.ToInt32(Math.Abs(repositoryApiMembersAllCount / MaxRecordsPerPage) + 1), MaxRecordsPerPage, repositoryApiMembersAllCount);
            }
            return new PaginationWrapperModel<RepositoryApiMemberModel>();
        }
    }
}