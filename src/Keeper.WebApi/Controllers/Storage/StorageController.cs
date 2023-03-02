using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Application.RepositoryFiles.Commands.DeleteRepositoryFiles;
using Keeper.Application.RepositoryFiles.Commands.UpdateRepositoryFileContent;
using Keeper.Application.RepositoryFiles.Commands.UploadRepositoryFiles;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryFiles;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryFileStream;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using Keeper.WebApi.Helpers;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Storage;

[Route("[controller]/{repositoryId:guid}")]
[Authorize(AuthenticationSchemes = MemberKeyAuthenticationOptions.DefaultScheme)]
[ApiController]
public class StorageController : ControllerBase
{
    private readonly IRepositoryActivitiesService _repositoryService;
    private readonly IMapper _mapper;
    private readonly ISender _mediatR;
    private readonly ILogger<StorageController> _logger;

    public StorageController(IRepositoryActivitiesService repositoryService, IMapper mapper, ILogger<StorageController> logger, ISender mediatR)
    {
        _repositoryService = repositoryService;
        _mapper = mapper;
        _logger = logger;
        _mediatR = mediatR;
    }

    [HttpGet("{fileId:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> DownloadFileById([FromRoute] GetRepositoryFileStreamQuery getRepositoryFileStreamQuery)
    {
        try
        {
            using var fileWithStream = await _mediatR.Send(getRepositoryFileStreamQuery);
            Response.ContentType = MimeHelper.GetMimeType(fileWithStream.File.Name ?? "");
            Response.Headers.Add("Content-Disposition", $"attachment; filename={fileWithStream.File.Name}");
            await fileWithStream.Stream.CopyToAsync(Response.Body);
            return new EmptyResult();
        }
        catch
        {
            return NotFound();
        }
    }

    [HttpPost("upload")]
    [DisableRequestSizeLimit]
    public async Task<ActionResult<List<FileModel>>> UploadFiles([FromRoute] Guid repositoryId, [FromForm] IEnumerable<IFileUpload> files)
    {
        var fileIds = await _mediatR.Send(new UploadRepositoryFilesCommand { RepositoryId = repositoryId, Files = files });
        return await _mediatR.Send(new GetRepositoryFilesQuery { RepositoryId = repositoryId, FileIds = fileIds });
    }

    [HttpPut("{fileId:guid}/update")]
    [DisableRequestSizeLimit]
    public async Task<IActionResult> UpdateFile([FromRoute] Guid repositoryId, [FromRoute] Guid fileId, [FromForm] IFileUpload file)
    {
        await _mediatR.Send(new UpdateRepositoryFileContentCommand { RepositoryId = repositoryId, FileId = fileId, File = file });
        return NoContent();
    }

    [HttpPut("remove")]
    [DisableRequestSizeLimit]
    public async Task<IActionResult> RemoveFiles([FromRoute] Guid repositoryId, [FromBody] IEnumerable<Guid> fileIds)
    {
        await _mediatR.Send(new DeleteRepositoryFilesCommand { RepositoryId = repositoryId, FileIds = fileIds });
        return NoContent();
    }

}