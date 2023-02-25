using System.IO.Compression;
using Keeper.Application.Interfaces;
using Keeper.Application.Models;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.WebApi.Helpers;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/repository/{repositoryId:guid}/[controller]")]
[ApiController]
[Authorize]
public class StorageController : ControllerBase
{
    private readonly IRepositoryService _repositoryService;
    private readonly IMapper _mapper;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    private readonly ILogger<StorageController> _logger;

    private const int _batchTakeRepositoryFilesLimit = 200;

    public StorageController(IRepositoryService repositoryService, IMapper mapper, ILogger<StorageController> logger, IRepositoryActivitiesService repositoryActivitiesService)
    {
        _repositoryActivitiesService = repositoryActivitiesService;
        _repositoryService = repositoryService;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("records")]
    public async Task<IActionResult> GetRepositoryFilesBatched([FromRoute] Guid repositoryId, int offset = 0, int take = _batchTakeRepositoryFilesLimit)
    {
        if (offset < 0)
            offset = 0;

        if (take > _batchTakeRepositoryFilesLimit || take < 0)
            take = _batchTakeRepositoryFilesLimit;

        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            BatchWrapperModel<FileModel> filesBatch = await _repositoryService.GetRepositoryFilesBatch(user.Id, repositoryId, offset, take);
            return Ok(filesBatch);
        }
        return BadRequest();
    }

    [HttpPost("upload")]
    [DisableRequestSizeLimit]
    public async Task<IActionResult> UploadFiles([FromRoute] Guid repositoryId, [FromForm] IEnumerable<IFormFile> files)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user is not null)
        {
            var res = await _repositoryService.CreateFilesByForm(user.Id, repositoryId, files);
            if(res != null)
            {
                await _repositoryActivitiesService.CreateActivity(repositoryId, user.Email!, RepositoryActivity.UploadFilesToRepository, $"Uploaded {res.Count} files in total");
                return Ok(res);
            }
            else
            {
                return BadRequest("Repository not found");
            }
        }
        return BadRequest();
    }

    [HttpPost("delete-many")]
    public async Task<IActionResult> DeleteFiles([FromRoute] Guid repositoryId, [FromBody] IEnumerable<Guid> fileIds)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user is not null)
        {
            int affectedRows = await _repositoryService.DeleteFiles(user.Id, repositoryId, fileIds);
            if (affectedRows > 0)
            {
                await _repositoryActivitiesService.CreateActivity(repositoryId, user.Email!, RepositoryActivity.DeleteFilesFromRepository, $"Deleted {affectedRows} files in total");
                return Ok();
            }
            
        }
        return BadRequest();
    }


    [HttpPost("download-many")]
    public async Task DownloadFiles([FromRoute] Guid repositoryId, [FromBody] IEnumerable<Guid> fileIds)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user is not null)
        {
            Response.ContentType = "application/octet-stream";

            Response.Headers.Add("Content-Disposition", $"attachment; filename={DateTime.Now}");

            var files = (await _repositoryService.GetFilesReadStreams(user.Id, repositoryId, fileIds)).ToList();
            if (files.Count > 1)
            {
                using (var archive = new ZipArchive(Response.BodyWriter.AsStream(), ZipArchiveMode.Create))
                {
                    foreach (var fileAccess in files)
                    {
                        try
                        {
                            using (var fileStream = await fileAccess.OpenStreamAsync(RepositoryFileStreamMode.Read))
                            {
                                var entry = archive.CreateEntry(fileAccess.Name, CompressionLevel.Optimal);
                                using var entryStream = entry.Open();
                                await fileStream.CopyToAsync(entryStream);
                            }
                        }
                        catch
                        {
                            _logger.LogWarning($"Error while accessing file {fileAccess.Name}");
                        }
                    }
                }
            }
            else if(files.Count == 1)
            {
                var file = files.First();
                try
                {
                    using (var fileStream = await file.OpenStreamAsync(RepositoryFileStreamMode.Read))
                    {
                        await fileStream.CopyToAsync(Response.Body);
                    }
                }
                catch
                {
                    _logger.LogWarning($"Error while accessing file {file.Name}");
                }
            }
        }
    }
}