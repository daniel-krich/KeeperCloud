using Keeper.Application.Common.Exceptions;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Application.Common.Security.Attributes;
using Keeper.Application.RepositoryFiles.Exceptions;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Commands.UpdateRepositoryFileContent;

[AuthorizedUserRequest]
[AuthorizedRepositoryMemberRequest]
public record UpdateRepositoryFileContentCommand : IRequest
{
    public Guid RepositoryId { get; set; }
    public Guid FileId { get; set; }
#nullable disable
    public IFileUpload File { get; set; }
#nullable enable
}


public class UpdateRepositoryFileContentCommandHandler : IRequestHandler<UpdateRepositoryFileContentCommand>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    public UpdateRepositoryFileContentCommandHandler(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor, IAuthenticatedUserService authenticatedUserService, IRepositoryActivitiesService repositoryActivitiesService)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _authenticatedUserService = authenticatedUserService;
        _repositoryActivitiesService = repositoryActivitiesService;
    }

    public async Task Handle(UpdateRepositoryFileContentCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var fileEntity = await context.Files.Include(x => x.Repository).Where(FindRepositoryByCredentials(user)).FirstOrDefaultAsync(x => x.RepositoryId == request.RepositoryId && x.Id == request.FileId);
            if (fileEntity != null)
            {
                if (_repositoriesAccessor.OpenRepository(fileEntity.Repository.OwnerId, fileEntity.RepositoryId) is IRepository repo)
                {
                    using (var fileStream = request.File.OpenReadStream())
                    {
                        if (repo.CreateRepoFileAccessor() is IRepositoryFile repoFile)
                        {
                            using (Stream repoFileStream = await repoFile.OpenWriteStreamAsync(fileEntity.EncKey, fileEntity.EncIV, true, cancellationToken))
                            {
                                await fileStream.CopyToAsync(repoFileStream);
                            }
                        }
                        fileEntity.FileSize = fileStream.Length;
                        context.Files.Update(fileEntity);
                        await context.SaveChangesAsync();
                        await _repositoryActivitiesService.AddRepositoryActivity(request.RepositoryId, RepositoryActivity.UploadFilesToRepository, user.IdentityName!, user.UserType, $"Updated file: {fileEntity.Name}");
                        return;
                    }
                }
            }
            throw new RepositoryFileNotFoundException();
        }
    }

    private Expression<Func<FileEntity, bool>> FindRepositoryByCredentials(UserCredentials user)
    {
        if (user.UserType == UserCredentialsType.DefaultUser) return (file) => file.Repository.OwnerId == user.Id;
        else if (user.UserType == UserCredentialsType.RepositoryMember) return (file) => file.Repository.ApiMembers.Any(x => x.Id == user.Id && x.PermissionFlags.HasFlag(RepositoryPermissionFlags.CanUpdate));
        else return _ => false;
    }
}