using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Application.Common.Security.Attributes;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFiles;

[AuthorizedUserRequest]
[AuthorizedRepositoryMemberRequest]
public record GetRepositoryFilesQuery : IRequest<List<FileModel>>
{
    public Guid RepositoryId { get; set; }
#nullable disable
    public IEnumerable<Guid> FileIds { get; set; }
#nullable enable
}

public class GetRepositoryFilesQueryHandler : IRequestHandler<GetRepositoryFilesQuery, List<FileModel>>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    public GetRepositoryFilesQueryHandler(IKeeperDbContextFactory keeperFactory, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<List<FileModel>> Handle(GetRepositoryFilesQuery request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repository = await context.Repositories.Include(x =>
                                    x.Files.Where(y => request.FileIds.Contains(y.Id)).OrderByDescending(y => y.CreatedDate)
                            ).Where(FindRepositoryByCredentials(user)).FirstOrDefaultAsync(x => x.Id == request.RepositoryId);
            if (repository != null)
            {
                return _mapper.Map<List<FileModel>>(repository.Files);
            }
            return new List<FileModel>();
        }
    }

    private Expression<Func<RepositoryEntity, bool>> FindRepositoryByCredentials(UserCredentials user)
    {
        if (user.UserType == UserCredentialsType.DefaultUser) return (repository) => repository.OwnerId == user.Id;
        else if (user.UserType == UserCredentialsType.RepositoryMember) return (repository) => repository.ApiMembers.Any(x => x.Id == user.Id);
        else return _ => false;
    }
}