using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryFileStream;
using Keeper.Domain.Enums;
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
    [Authorize(AuthenticationSchemes = MemberKeyAuthenticationOptions.DefaultScheme)]
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
}