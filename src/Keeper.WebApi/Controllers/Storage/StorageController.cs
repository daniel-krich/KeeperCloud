using Keeper.Application.Interfaces;
using Keeper.Application.Models;
using Keeper.Domain.Enums;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using Keeper.WebApi.Helpers;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Storage;

[Route("[controller]/{repositoryId:guid}")]
[ApiController]
public class StorageController : ControllerBase
{
    private readonly IRepositoryService _repositoryService;
    private readonly IMapper _mapper;
    private readonly ILogger<StorageController> _logger;

    public StorageController(IRepositoryService repositoryService, IMapper mapper, ILogger<StorageController> logger)
    {
        _repositoryService = repositoryService;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet("{fileId:guid}")]
    [Authorize(AuthenticationSchemes = MemberKeyAuthenticationOptions.DefaultScheme)]
    [AllowAnonymous]
    public async Task<IActionResult> DownloadFileById([FromRoute] Guid repositoryId, [FromRoute] Guid fileId)
    {
        var member = ClaimsHelper.RetreiveFullMemberFromClaims(HttpContext.User);

        var repository = await _repositoryService.GetRepository(repositoryId);
        if (repository != null)
        {
            if ((member != null && member.RepositoryId == repositoryId && member.PermissionFlags.HasFlag(RepositoryPermissionFlags.CanRead)) || repository.AllowAnonymousFileRead)
            {
                var file = (await _repositoryService.GetFilesReadStreams(repository.OwnerId, repositoryId, new List<Guid> { fileId })).FirstOrDefault();

                if (file != null)
                {
                    try
                    {
                        Response.ContentType = MimeHelper.GetMimeType(file.Name);
                        Response.Headers.Add("Content-Disposition", $"attachment; filename={file.Name}");

                        using (var fileStream = await file.OpenStreamAsync(RepositoryFileStreamMode.Read))
                        {
                            await fileStream.CopyToAsync(Response.Body);
                        }

                        return new EmptyResult();
                    }
                    catch
                    {
                        _logger.LogWarning($"Error while accessing file {file.Name}");
                    }
                }
                else
                {
                    return NotFound("File not found");
                }
            }
            else
            {
                return Unauthorized();
            }
        }
        return NotFound("Repository not found");
    }
}