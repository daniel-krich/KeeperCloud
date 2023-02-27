using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Repositories.Commands.CreateRepository;
using Keeper.Application.Repositories.Queries.GetRepository;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.WebApi.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class RepositoryController : ControllerBase
{
    private readonly IRepositoryService _repoService;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    private readonly ISender _mediatR;

    public RepositoryController(IRepositoryService repoService, IRepositoryActivitiesService repositoryActivitiesService, ISender mediatR)
    {
        _repoService = repoService;
        _repositoryActivitiesService = repositoryActivitiesService;
        _mediatR = mediatR;
    }

    [HttpGet("{repositoryId:guid}")]
    public async Task<ActionResult<RepositoryModel>> GetRepositoryInfo([FromRoute] Guid repositoryId)
    {
        return await _mediatR.Send(new GetRepositoryQuery { RepositoryId = repositoryId });
    }

    [HttpPost("create")]
    public async Task<ActionResult<RepositoryModel>> PostNewRepository([FromBody] CreateRepositoryCommand createRepositoryCommand)
    {
        var repositoryId = await _mediatR.Send(createRepositoryCommand);
        return await _mediatR.Send(new GetRepositoryQuery { RepositoryId = repositoryId });
    }

    [HttpDelete("{repositoryId:guid}")]
    public async Task<IActionResult> DeleteRepository([FromRoute] Guid repositoryId)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            if (await _repoService.DeleteRepository(user.Id, repositoryId))
            {
                return Ok();
            }
        }
        return BadRequest();
    }

    [HttpPut("{repositoryId:guid}")]
    public async Task<IActionResult> PutRepositoryUpdates([FromRoute] Guid repositoryId, [FromBody] UpdateRepositoryRequestDto updateRepositoryRequest)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            if(await _repoService.UpdateRepository(user.Id, repositoryId, updateRepositoryRequest))
            {
                await _repositoryActivitiesService.CreateActivity(repositoryId, user.Email!, RepositoryActivity.UpdateRepository, $"Name or description changed");
                return Ok();
            }
        }
        return BadRequest();
    }

    [HttpPut("{repositoryId:guid}/allow-anonymous-file-read")]
    public async Task<IActionResult> PutRepositoryAllowAnonymousFileRead([FromRoute] Guid repositoryId, [FromQuery] bool allow)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            if(await _repoService.UpdateRepositoryAllowAnonymousFileRead(user.Id, repositoryId, allow))
            {
                await _repositoryActivitiesService.CreateActivity(repositoryId, user.Email!, RepositoryActivity.ToggleRepositoryAccess, allow ? "Opened repository" : "Closed repository");
                return Ok();
            }
        }
        return BadRequest();
    }
}