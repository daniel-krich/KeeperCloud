using System.IO.Compression;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.RepositoryFiles.Commands.DeleteRepositoryFiles;
using Keeper.Application.RepositoryFiles.Commands.UploadRepositoryFiles;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryFiles;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryFilesBatched;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryFileStream;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryMultipleFileStream;
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
    private readonly ISender _mediatR;
    private readonly ILogger<RepositoryFilesController> _logger;

    public RepositoryFilesController(ILogger<RepositoryFilesController> logger, ISender mediatR)
    {
        _logger = logger;
        _mediatR = mediatR;
    }

    [HttpGet]
    public async Task<ActionResult<BatchWrapperModel<FileModel>>> GetRepositoryFilesBatched([FromQuery] GetRepositoryFilesBatchedQuery getRepositoryFilesBatchedQuery)
    {
        return await _mediatR.Send(getRepositoryFilesBatchedQuery);
    }

    [HttpPost("upload")]
    [DisableRequestSizeLimit]
    public async Task<ActionResult<List<FileModel>>> UploadFiles([FromForm] UploadRepositoryFilesCommand uploadRepositoryFilesCommand)
    {
        var fileIds = await _mediatR.Send(uploadRepositoryFilesCommand);
        return await _mediatR.Send(new GetRepositoryFilesQuery { RepositoryId = uploadRepositoryFilesCommand.RepositoryId, FileIds = fileIds });
    }

    [HttpPost("remove")]
    public async Task<IActionResult> DeleteFiles([FromBody] DeleteRepositoryFilesCommand deleteRepositoryFilesCommand)
    {
        var deleteCount = await _mediatR.Send(deleteRepositoryFilesCommand);
        return NoContent();
    }


    [HttpPost("download")]
    public async Task<IActionResult> DownloadFiles([FromBody] GetRepositoryMultipleFileStreamQuery getRepositoryMultipleFileStreamQuery)
    {

        Response.Headers.Add("Content-Disposition", $"attachment; filename={DateTime.Now}");

        if (getRepositoryMultipleFileStreamQuery.FileIds.Count() > 1)
        {
            Response.ContentType = "application/octet-stream";
            var multipleFileCollection = await _mediatR.Send(getRepositoryMultipleFileStreamQuery);
            using (var archive = new ZipArchive(Response.BodyWriter.AsStream(), ZipArchiveMode.Create))
            {
                await foreach (var fileWithStream in multipleFileCollection)
                {
                    using (fileWithStream)
                    {
                        var entry = archive.CreateEntry(fileWithStream.File.Name!, CompressionLevel.Optimal);
                        using var entryStream = entry.Open();
                        await fileWithStream.Stream.CopyToAsync(entryStream);
                    }
                }
                return new EmptyResult();
            }
        }
        else if (getRepositoryMultipleFileStreamQuery.FileIds.Count() == 1)
        {
            var singleFileCollection = await _mediatR.Send(new GetRepositoryFileStreamQuery { RepositoryId = getRepositoryMultipleFileStreamQuery.RepositoryId, FileId = getRepositoryMultipleFileStreamQuery.FileIds.First() });
            Response.ContentType = MimeHelper.GetMimeType(singleFileCollection.File.Name!);
            await singleFileCollection.Stream.CopyToAsync(Response.Body);
            return new EmptyResult();
        }
        else return BadRequest();
    }
}