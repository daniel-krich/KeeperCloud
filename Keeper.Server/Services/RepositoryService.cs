using Keeper.DataAccess.Entities;
using Keeper.DataAccess.Factories;
using Keeper.RepositoriesMaster.Enums;
using Keeper.RepositoriesMaster.FileAccess;
using Keeper.RepositoriesMaster.Helper;
using Keeper.RepositoriesMaster.Master;
using Keeper.Server.DTOs;
using Keeper.Server.Models;
using Keeper.Server.Utils;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text.Json;

namespace Keeper.Server.Services
{
    public interface IRepositoryService
    {
        Task<RepositoryModel?> CreateRepository(Guid userId, CreateRepositoryRequestDTO request);
        Task<BatchWrapperModel<RepositoryModel>> GetRepositoriesBatch(Guid userId, int batchOffset, int batchCountLimit);
        Task<RepositoryModel?> GetRepository(Guid userId, Guid repositoryId);
        Task<BatchWrapperModel<FileModel>> GetRepositoryFilesBatch(Guid userId, Guid repositoryId, int batchOffset, int batchCountLimit);
        Task<(FileModel fileMetadata, IRepositoryFile? file)?> GetFileAccessor(Guid userId, Guid repositoryId, Guid fileId);
        Task<List<FileModel>> CreateFilesByForm(Guid userId, Guid repositoryId, IEnumerable<IFormFile> files);
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

        public async Task<RepositoryModel?> CreateRepository(Guid userId, CreateRepositoryRequestDTO request)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                if(await context.Users.FindAsync(userId) is UserEntity user)
                {
                    var repo = _repoMaster.CreateRepository(userId);
                    if (repo != null)
                    {
                        var repoEntity = new RepositoryEntity
                        {
                            Id = repo.RepositoryId,
                            OwnerId = repo.OwnerId,
                            Name = request.Name,
                            Description = request.Description
                        };
                        context.Repositories.Add(repoEntity);
                        await context.SaveChangesAsync();
                        return _mapper.Map<RepositoryModel>(repoEntity);
                    }
                }
                return default;
            }
        }

        public async Task<(FileModel fileMetadata, IRepositoryFile? file)?> GetFileAccessor(Guid userId, Guid repositoryId, Guid fileId)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var fileEntity = await context.Files.Include(x => x.Repository)
                                                    .FirstOrDefaultAsync(x => x.Id == fileId && x.Repository.Id == repositoryId && x.Repository.OwnerId == userId);
                if (fileEntity != null)
                {
                    var repo = _repoMaster.OpenRepository(userId, repositoryId);
                    if(repo != null)
                    {
                        return (_mapper.Map<FileModel>(fileEntity), repo.OpenRepoFileAccessor(fileId));
                    }
                }
                return default;
            }
        }

        public async Task<List<FileModel>> CreateFilesByForm(Guid userId, Guid repositoryId, IEnumerable<IFormFile> files)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repoEntity = await context.Repositories.Include(x => x.Owner)
                                                           .FirstOrDefaultAsync(x => x.Id == repositoryId && x.Owner.Id == userId);
                if (repoEntity != null)
                {
                    if(_repoMaster.OpenRepository(userId, repositoryId) is IRepository repo)
                    {
                        var fileEntities = new List<FileEntity>();
                        foreach(var file in files)
                        {
                            if(repo.CreateRepoFileAccessor() is IRepositoryFile repoFile)
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
                                    await file.CopyToAsync(repoFileStream);
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
                        context.Files.AddRange(fileEntities);
                        await context.SaveChangesAsync();
                        return _mapper.Map<List<FileModel>>(fileEntities);
                    }
                }
                throw new ApplicationException("err...");
            }
        }

        public async Task<BatchWrapperModel<RepositoryModel>> GetRepositoriesBatch(Guid userId, int batchOffset, int batchTakeLimit)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repositories = await context.Repositories.Where(x => x.OwnerId == userId)
                                                             .OrderByDescending(x => x.CreatedDate)
                                                             .Skip(batchOffset)
                                                             .Take(batchTakeLimit).ToListAsync();
                var howMuchReposLeftCount = (await context.Repositories.Where(x => x.OwnerId == userId).CountAsync()) - batchOffset - repositories.Count;
                var repModelList = _mapper.Map<List<RepositoryEntity>, List<RepositoryModel>>(repositories);
                return new BatchWrapperModel<RepositoryModel>(repModelList, batchOffset, howMuchReposLeftCount);
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
                if(repository != null)
                {
                    var howMuchFilesLeftCount = (await context.Files.Where(x => x.RepositoryId == repositoryId).CountAsync()) - batchOffset - repository.Files.Count;
                    var fileModelList = _mapper.Map<ICollection<FileEntity>, List<FileModel>>(repository.Files);
                    return new BatchWrapperModel<FileModel>(fileModelList, batchOffset, howMuchFilesLeftCount);
                }
                return new BatchWrapperModel<FileModel>();
            }
        }

        public async Task<RepositoryModel?> GetRepository(Guid userId, Guid repositoryId)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repository = await context.Repositories.FirstOrDefaultAsync(x => x.OwnerId == userId && x.Id == repositoryId);
                if (repository != null)
                {
                    return _mapper.Map<RepositoryEntity, RepositoryModel>(repository);
                }
                return default;
            }
        }
    }
}