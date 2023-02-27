using System.IO.Compression;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.RepositoryFiles.Commands.DeleteRepositoryFiles;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryFilesBatched;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.WebApi.Helpers;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/repository/files")]
[ApiController]
[Authorize]
public class RepositoryFilesController : ControllerBase
{
    private readonly IRepositoryService _repositoryService;
    private readonly IMapper _mapper;
    private readonly ISender _mediatR;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    private readonly ILogger<RepositoryFilesController> _logger;

    public RepositoryFilesController(IRepositoryService repositoryService, IMapper mapper, ILogger<RepositoryFilesController> logger, IRepositoryActivitiesService repositoryActivitiesService, ISender mediatR)
    {
        _repositoryActivitiesService = repositoryActivitiesService;
        _repositoryService = repositoryService;
        _mapper = mapper;
        _logger = logger;
        _mediatR = mediatR;
    }

    [HttpGet]
    public async Task<ActionResult<BatchWrapperModel<FileModel>>> GetRepositoryFilesBatched([FromQuery] GetRepositoryFilesBatchedQuery getRepositoryFilesBatchedQuery)
    {
        return await _mediatR.Send(getRepositoryFilesBatchedQuery);
    }

    /*[HttpPost("upload")]
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
    }*/

    [HttpPost("remove-many")]
    public async Task<IActionResult> DeleteFiles([FromBody] DeleteRepositoryFilesCommand deleteRepositoryFilesCommand)
    {
        var deleteCount = await _mediatR.Send(deleteRepositoryFilesCommand);
        return NoContent();
    }


    /*[HttpPost("download-many")]
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
    }*/
}