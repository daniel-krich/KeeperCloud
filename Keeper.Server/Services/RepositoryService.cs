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
        Task CreateRepository(Guid userId, CreateRepositoryRequestDTO request);
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

        public async Task CreateRepository(Guid userId, CreateRepositoryRequestDTO request)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                if(await context.Users.FindAsync(userId) is UserEntity user)
                {
                    var repo = _repoMaster.CreateRepository(userId);
                    if (repo != null)
                    {
                        context.Repositories.Add(new RepositoryEntity
                        {
                            Id = repo.RepositoryId,
                            OwnerId = repo.OwnerId,
                            Name = request.Name,
                            Description = request.Description
                        });
                    }
                }
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
                        return (TransformTypeUtil.Transform<FileEntity, FileModel>(fileEntity), repo.OpenRepoFileAccessor(fileId));
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
                                using Stream repoFileStream = await repoFile.OpenStreamAsync(o =>
                                {
                                    o.Mode = RepositoryFileStreamMode.Write;
                                    o.Encryption = true;
                                    o.Key = aes.Key;
                                    o.IV = aes.IV;
                                    o.Compression = true;
                                });

                                await file.CopyToAsync(repoFileStream);

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
    }
}