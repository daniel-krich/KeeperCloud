using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Application.Common.Security.Attributes;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Keeper.Application.RepositoryFiles.Commands.DeleteRepositoryFiles;

[AuthorizedUserRequest]
[AuthorizedRepositoryMemberRequest]
public record DeleteRepositoryFilesCommand : IRequest<int>
{
    public Guid RepositoryId { get; set; }
#nullable disable
    public IEnumerable<Guid> FileIds { get; set; }
#nullable enable
}

public class DeleteRepositoryFilesCommandHandler : IRequestHandler<DeleteRepositoryFilesCommand, int>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    public DeleteRepositoryFilesCommandHandler(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor, IMapper mapper, IAuthenticatedUserService authenticatedUserService, IRepositoryActivitiesService repositoryActivitiesService)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
        _repositoryActivitiesService = repositoryActivitiesService;
    }

    public async Task<int> Handle(DeleteRepositoryFilesCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repo = await context.Repositories.Where(FindRepositoryByCredentials(user)).FirstOrDefaultAsync(x => x.Id == request.RepositoryId);
            if (repo is not null)
            {
                var fileEntities = await context.Files.Where(x => request.FileIds.Contains(x.Id) && x.RepositoryId == request.RepositoryId).ToListAsync();

                var repoAccess = _repositoriesAccessor.OpenRepository(repo.OwnerId, request.RepositoryId);
                if (repoAccess != null && fileEntities.Count > 0)
                {
                    foreach (var file in fileEntities)
                    {
                        var fileAccess = repoAccess.OpenRepoFileAccessor(file.Id);
                        if (fileAccess != null)
                        {
                            await fileAccess.DeleteAsync();
                        }
                    }

                    context.Files.RemoveRange(fileEntities);
                    var resultsCount = await context.SaveChangesAsync();
                    await _repositoryActivitiesService.AddRepositoryActivity(request.RepositoryId, RepositoryActivity.DeleteFilesFromRepository, user.IdentityName!, user.UserType, $"Deleted files: {resultsCount}");
                    return resultsCount;
                }
            }
            return 0;
        }
    }

    private Expression<Func<RepositoryEntity, bool>> FindRepositoryByCredentials(UserCredentials user)
    {
        if (user.UserType == UserCredentialsType.DefaultUser) return (repository) => repository.OwnerId == user.Id;
        else if (user.UserType == UserCredentialsType.RepositoryMember) return (repository) => repository.ApiMembers.Any(x => x.Id == user.Id && x.PermissionFlags.HasFlag(RepositoryPermissionFlags.CanDelete));
        else return _ => false;
    }
}