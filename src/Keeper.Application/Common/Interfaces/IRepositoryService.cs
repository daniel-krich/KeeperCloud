using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Keeper.Application.Common.Interfaces;

public interface IRepositoryService
{
    //Task<RepositoryExtendedModel?> CreateRepository(Guid userId, CreateRepositoryRequestDto request);
    //Task<BatchWrapperModel<RepositoryExtendedModel>> GetRepositoriesBatch(Guid userId, int batchOffset, int batchCountLimit);
    //Task<RepositoryEntity?> GetRepository(Guid repositoryId);
    //Task<RepositoryExtendedModel?> GetRepositoryByUser(Guid userId, Guid repositoryId);
    //Task<BatchWrapperModel<FileModel>> GetRepositoryFilesBatch(Guid userId, Guid repositoryId, int batchOffset, int batchCountLimit);
    Task<(FileEntity fileEntity, IRepositoryFile? file)?> GetFileAccessor(Guid userId, Guid repositoryId, Guid fileId);
    Task<IEnumerable<FileStreamWithMetaModel>> GetFilesReadStreams(Guid userId, Guid repositoryId, IEnumerable<Guid> fileIds);
    Task<List<FileModel>?> CreateFilesByForm(Guid userId, Guid repositoryId, IEnumerable<IFormFile> files);
    //Task<int> DeleteFiles(Guid userId, Guid repositoryId, IEnumerable<Guid> fileIds);
    //Task<bool> DeleteRepository(Guid userId, Guid repositoryId);
    //Task<bool> UpdateRepository(Guid userId, Guid repositoryId, UpdateRepositoryRequestDto updateRepositoryRequest);
    //Task<bool> UpdateRepositoryAllowAnonymousFileRead(Guid userId, Guid repositoryId, bool allow);
}