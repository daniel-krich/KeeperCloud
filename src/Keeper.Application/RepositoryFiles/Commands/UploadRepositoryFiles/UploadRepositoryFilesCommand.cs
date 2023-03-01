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
using System.Security.Cryptography;

namespace Keeper.Application.RepositoryFiles.Commands.UploadRepositoryFiles;

[AuthorizedUserRequest]
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
            var repoEntity = await context.Repositories.FirstOrDefaultAsync(x => x.Id == request.RepositoryId && x.OwnerId == user.Id);
            if (repoEntity != null)
            {
                if (_repositoriesAccessor.OpenRepository(user.Id, repoEntity.Id) is IRepository repo)
                {
                    var fileEntities = new List<FileEntity>();
                    foreach (var file in request.Files)
                    {
                        using (var fileStream = file.OpenReadStream())
                        {
                            if (repo.CreateRepoFileAccessor() is IRepositoryFile repoFile)
                            {
                                using Aes aes = Aes.Create();
                                using (Stream repoFileStream = await repoFile.OpenStreamAsync(o =>
                                {
                                    o.Mode = RepositoryFileStreamMode.Write;
                                    o.Key = aes.Key;
                                    o.IV = aes.IV;
                                    o.Encryption = true;
                                    o.Compression = true;
                                }))
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
}