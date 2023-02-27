using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Keeper.Infrastructure.Services;

public class RepositoryService : IRepositoryService
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IMapper _mapper;
    public RepositoryService(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor,  IMapper mapper)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _mapper = mapper;
    }

    public async Task<(FileEntity fileEntity, IRepositoryFile? file)?> GetFileAccessor(Guid userId, Guid repositoryId, Guid fileId)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var fileEntity = await context.Files.Include(x => x.Repository)
                                                .FirstOrDefaultAsync(x => x.Id == fileId && x.Repository.Id == repositoryId && x.Repository.OwnerId == userId);
            if (fileEntity != null)
            {
                var repo = _repositoriesAccessor.OpenRepository(userId, repositoryId);
                if (repo != null)
                {
                    return (fileEntity, repo.OpenRepoFileAccessor(fileId));
                }
            }
            return default;
        }
    }

    public async Task<List<FileModel>?> CreateFilesByForm(Guid userId, Guid repositoryId, IEnumerable<IFormFile> files)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repoEntity = await context.Repositories.Include(x => x.Owner)
                                                       .FirstOrDefaultAsync(x => x.Id == repositoryId && x.Owner.Id == userId);
            if (repoEntity != null)
            {
                if (_repositoriesAccessor.OpenRepository(userId, repositoryId) is IRepository repo)
                {
                    var fileEntities = new List<FileEntity>();
                    foreach (var file in files)
                    {
                        using (var fileStream = file.OpenReadStream())
                        {
                            if (repo.CreateRepoFileAccessor() is IRepositoryFile repoFile)
                            {
                                using Aes aes = Aes.Create();
                                using (Stream repoFileStream = await repoFile.OpenStreamAsync(o =>
                                 {
                                     o.Mode = RepositoryFileStreamMode.Write;
                                     o.Encryption = true;
                                     o.Key = aes.Key;
                                     o.IV = aes.IV;
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
                    return _mapper.Map<List<FileModel>>(fileEntities);
                }
            }
            return default;
        }
    }

    public async Task<IEnumerable<FileStreamWithMetaModel>> GetFilesReadStreams(Guid userId, Guid repositoryId, IEnumerable<Guid> fileIds)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repo = await context.Repositories.FirstOrDefaultAsync(x => x.Id == repositoryId && x.OwnerId == userId);
            if (repo is not null)
            {
                var fileEntities = await context.Files.Where(x => fileIds.Contains(x.Id) && x.RepositoryId == repositoryId).ToListAsync();

                var repoAccess = _repositoriesAccessor.OpenRepository(userId, repositoryId);
                if (repoAccess != null)
                {

                    return fileEntities.Select(x =>
                    {
                        var repoFile = repoAccess.OpenRepoFileAccessor(x.Id);

                        return new FileStreamWithMetaModel(x.Name, x.FileSize, x.EncKey, x.EncIV, repoFile);
                    });
                }
            }
            return new List<FileStreamWithMetaModel>();
        }
    }

    public async Task<bool> UpdateRepository(Guid userId, Guid repositoryId, UpdateRepositoryRequestDto updateRepositoryRequest)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repo = await context.Repositories.Include(x => x.Owner).FirstOrDefaultAsync(x => x.Id == repositoryId && x.OwnerId == userId);
            if (repo is not null)
            {
                repo.Name = updateRepositoryRequest.Name;
                repo.Description = updateRepositoryRequest.Description;
                context.Repositories.Update(repo);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }

    public async Task<bool> UpdateRepositoryAllowAnonymousFileRead(Guid userId, Guid repositoryId, bool allow)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repo = await context.Repositories.Include(x => x.Owner).FirstOrDefaultAsync(x => x.Id == repositoryId && x.OwnerId == userId);
            if (repo is not null)
            {
                repo.AllowAnonymousFileRead = allow;
                context.Repositories.Update(repo);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}