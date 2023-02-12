using Keeper.DataAccess.Context;
using Keeper.DataAccess.Entities;
using Keeper.DataAccess.Factories;
using Keeper.RepositoriesMaster.Enums;
using Keeper.RepositoriesMaster.FileAccess;
using Keeper.RepositoriesMaster.Master;
using Keeper.Server.DTOs;
using Keeper.Server.Models;
using Keeper.Server.Utils;
using MapsterMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text.Json;

namespace Keeper.Server.Services
{
    public interface IRepositoryService
    {
        Task<RepositoryExtendedModel?> CreateRepository(Guid userId, CreateRepositoryRequestDTO request);
        Task<BatchWrapperModel<RepositoryExtendedModel>> GetRepositoriesBatch(Guid userId, int batchOffset, int batchCountLimit);
        Task<RepositoryExtendedModel?> GetRepository(Guid userId, Guid repositoryId);
        Task<BatchWrapperModel<FileModel>> GetRepositoryFilesBatch(Guid userId, Guid repositoryId, int batchOffset, int batchCountLimit);
        Task<(FileEntity fileEntity, IRepositoryFile? file)?> GetFileAccessor(Guid userId, Guid repositoryId, Guid fileId);
        Task<IEnumerable<FileStreamWithMetaModel>> GetFilesReadStreams(Guid userId, Guid repositoryId, IEnumerable<Guid> fileIds);
        Task<List<FileModel>?> CreateFilesByForm(Guid userId, Guid repositoryId, IEnumerable<IFormFile> files);
        Task<bool> DeleteFiles(Guid userId, Guid repositoryId, IEnumerable<Guid> fileIds);
        Task<bool> DeleteRepository(Guid userId, Guid repositoryId);
        Task<bool> UpdateRepository(Guid userId, Guid repositoryId, UpdateRepositoryRequestDTO updateRepositoryRequest);
    }

    public class RepositoryService : IRepositoryService
    {
        private readonly IKeeperDbContextFactory _keeperFactory;
        private readonly IRepositoriesMaster _repoMaster;
        private readonly IMapper _mapper;
        public RepositoryService(IKeeperDbContextFactory keeperFactory, IRepositoriesMaster repoMaster, IMapper mapper)
        {
            _keeperFactory = keeperFactory;
            _repoMaster = repoMaster;
            _mapper = mapper;
        }

        public async Task<RepositoryExtendedModel?> CreateRepository(Guid userId, CreateRepositoryRequestDTO request)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                if (await context.Users.FindAsync(userId) is UserEntity user)
                {
                    var repo = _repoMaster.CreateRepository(userId);
                    if (repo != null)
                    {
                        var repoEntity = new RepositoryEntity
                        {
                            Id = repo.RepositoryId,
                            OwnerId = repo.OwnerId,
                            Name = request.Name,
                            Description = request.Description,
                            AllowAnonymousFileRead = false
                        };
                        context.Repositories.Add(repoEntity);
                        await context.SaveChangesAsync();
                        return _mapper.Map<RepositoryExtendedModel>(repoEntity);
                    }
                }
                return default;
            }
        }

        public async Task<(FileEntity fileEntity, IRepositoryFile? file)?> GetFileAccessor(Guid userId, Guid repositoryId, Guid fileId)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var fileEntity = await context.Files.Include(x => x.Repository)
                                                    .FirstOrDefaultAsync(x => x.Id == fileId && x.Repository.Id == repositoryId && x.Repository.OwnerId == userId);
                if (fileEntity != null)
                {
                    var repo = _repoMaster.OpenRepository(userId, repositoryId);
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
                    if (_repoMaster.OpenRepository(userId, repositoryId) is IRepository repo)
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

        public async Task<BatchWrapperModel<RepositoryExtendedModel>> GetRepositoriesBatch(Guid userId, int batchOffset, int batchTakeLimit)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {

                var repositoriesFragments = await (from repo in context.Repositories
                                                   where repo.OwnerId == userId
                                                   select new
                                                   {
                                                       Repo = repo,
                                                       OverallFileCount = repo.Files.Count(),
                                                       OverallRepositorySize = repo.Files.Sum(f => f.FileSize)
                                                   }).OrderByDescending(x => x.Repo.CreatedDate).Skip(batchOffset).Take(batchTakeLimit).ToListAsync();

                var repositories = repositoriesFragments.Select(x =>
                {
                    var repo = _mapper.Map<RepositoryExtendedModel>(x.Repo);
                    repo.OverallFileCount = x.OverallFileCount;
                    repo.OverallRepositorySize = x.OverallRepositorySize;
                    return repo;
                }).ToList();

                var howMuchReposLeftCount = (await context.Repositories.Where(x => x.OwnerId == userId).CountAsync()) - batchOffset - repositories.Count;
                return new BatchWrapperModel<RepositoryExtendedModel>(repositories, batchOffset, howMuchReposLeftCount);
            }
        }

        public async Task<BatchWrapperModel<FileModel>> GetRepositoryFilesBatch(Guid userId, Guid repositoryId, int batchOffset, int batchCountLimit)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repository = await context.Repositories.Include(x =>
                                        x.Files.OrderByDescending(x => x.CreatedDate)
                                        .Skip(batchOffset)
                                        .Take(batchCountLimit)
                                ).FirstOrDefaultAsync(x => x.OwnerId == userId && x.Id == repositoryId);
                if (repository != null)
                {
                    var howMuchFilesLeftCount = (await context.Files.Where(x => x.RepositoryId == repositoryId).CountAsync()) - batchOffset - repository.Files.Count;
                    var fileModelList = _mapper.Map<ICollection<FileEntity>, List<FileModel>>(repository.Files);
                    return new BatchWrapperModel<FileModel>(fileModelList, batchOffset, howMuchFilesLeftCount);
                }
                return new BatchWrapperModel<FileModel>();
            }
        }

        public async Task<RepositoryExtendedModel?> GetRepository(Guid userId, Guid repositoryId)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repositoryFragments = await (from repo in context.Repositories.Include(x => x.Files)
                                                 where repo.OwnerId == userId && repo.Id == repositoryId
                                                 select new
                                                 {
                                                     Repo = repo,
                                                     OverallFileCount = repo.Files.Count(),
                                                     OverallRepositorySize = repo.Files.Sum(f => f.FileSize)
                                                 }).FirstOrDefaultAsync();

                if(repositoryFragments != null)
                {
                    var repository = _mapper.Map<RepositoryExtendedModel>(repositoryFragments.Repo);
                    repository.OverallFileCount = repositoryFragments.OverallFileCount;
                    repository.OverallRepositorySize = repositoryFragments.OverallRepositorySize;
                    return repository;
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

                    var repoAccess = _repoMaster.OpenRepository(userId, repositoryId);
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

        public async Task<bool> DeleteFiles(Guid userId, Guid repositoryId, IEnumerable<Guid> fileIds)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repo = await context.Repositories.FirstOrDefaultAsync(x => x.Id == repositoryId && x.OwnerId == userId);
                if (repo is not null)
                {
                    var fileEntities = await context.Files.Where(x => fileIds.Contains(x.Id) && x.RepositoryId == repositoryId).ToListAsync();

                    var repoAccess = _repoMaster.OpenRepository(userId, repositoryId);
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
                        await context.SaveChangesAsync();
                        return true;
                    }
                }
                return false;
            }
        }

        public async Task<bool> DeleteRepository(Guid userId, Guid repositoryId)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repo = await context.Repositories.FirstOrDefaultAsync(x => x.Id == repositoryId && x.OwnerId == userId);
                if (repo is not null)
                {
                    var repoAccess = _repoMaster.OpenRepository(userId, repositoryId);
                    if (repoAccess != null)
                    {
                        if (await repoAccess.DeleteRepository())
                        {
                            context.Repositories.Remove(repo);
                            await context.SaveChangesAsync();
                            return true;
                        }
                    }
                }
                return false;
            }
        }

        public async Task<bool> UpdateRepository(Guid userId, Guid repositoryId, UpdateRepositoryRequestDTO updateRepositoryRequest)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repo = await context.Repositories.FirstOrDefaultAsync(x => x.Id == repositoryId && x.OwnerId == userId);
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
    }
}