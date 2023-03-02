using Keeper.Application.Common.Exceptions;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Application.Common.Security.Attributes;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Security.Cryptography;

namespace Keeper.Application.RepositoryFiles.Commands.UploadRepositoryFiles;

[AuthorizedUserRequest]
[AuthorizedRepositoryMemberRequest]
public record UploadRepositoryFilesCommand : IRequest<IEnumerable<Guid>>
{
    public Guid RepositoryId { get; set; }
#nullable disable
    public IEnumerable<IFileUpload> Files { get; set; }
#nullable enable
}

public class UploadRepositoryFilesCommandHandler : IRequestHandler<UploadRepositoryFilesCommand, IEnumerable<Guid>>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    public UploadRepositoryFilesCommandHandler(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor, IAuthenticatedUserService authenticatedUserService, IRepositoryActivitiesService repositoryActivitiesService)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _authenticatedUserService = authenticatedUserService;
        _repositoryActivitiesService = repositoryActivitiesService;
    }

    public async Task<IEnumerable<Guid>> Handle(UploadRepositoryFilesCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repoEntity = await context.Repositories.Where(FindRepositoryByCredentials(user)).FirstOrDefaultAsync(x => x.Id == request.RepositoryId);
            if (repoEntity != null)
            {
                if (_repositoriesAccessor.OpenRepository(repoEntity.OwnerId, repoEntity.Id) is IRepository repo)
                {
                    var fileEntities = new List<FileEntity>();
                    foreach (var file in request.Files)
                    {
                        using (var fileStream = file.OpenReadStream())
                        {
                            if (repo.CreateRepoFileAccessor() is IRepositoryFile repoFile)
                            {
                                using Aes aes = Aes.Create();
                                using (Stream repoFileStream = await repoFile.OpenWriteStreamAsync(aes.Key, aes.IV, true, cancellationToken))
                                {
                                    await fileStream.CopyToAsync(repoFileStream);
                                }

                                fileEntities.Add(new FileEntity
                                {
                                    Id = repoFile.FileId,
                                    Name = file.FileName,
                                    EncKey = aes.Key,
                                    EncIV = aes.IV,
                                    FileSize = file.Length,
                                    RepositoryId = repoEntity.Id
                                });
                            }
                        }
                    }
                    context.Files.AddRange(fileEntities);
                    await context.SaveChangesAsync();
                    await _repositoryActivitiesService.AddRepositoryActivity(request.RepositoryId, RepositoryActivity.UploadFilesToRepository, user.IdentityName!, user.UserType, $"Uploaded files: {fileEntities.Count}");
                    return fileEntities.Select(x => x.Id);
                }
            }
            throw new RepositoryNotFoundException();
        }
    }

    private Expression<Func<RepositoryEntity, bool>> FindRepositoryByCredentials(UserCredentials user)
    {
        if (user.UserType == UserCredentialsType.DefaultUser) return (repository) => repository.OwnerId == user.Id;
        else if (user.UserType == UserCredentialsType.RepositoryMember) return (repository) => repository.ApiMembers.Any(x => x.Id == user.Id && x.PermissionFlags.HasFlag(RepositoryPermissionFlags.CanWrite));
        else return _ => false;
    }
}