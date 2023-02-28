using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Keeper.Application.Common.Interfaces;

public interface IRepositoryService
{
    Task<(FileEntity fileEntity, IRepositoryFile? file)?> GetFileAccessor(Guid userId, Guid repositoryId, Guid fileId);
    Task<IEnumerable<FileStreamWithMetaModel>> GetFilesReadStreams(Guid userId, Guid repositoryId, IEnumerable<Guid> fileIds);
    Task<List<FileModel>?> CreateFilesByForm(Guid userId, Guid repositoryId, IEnumerable<IFormFile> files);
}