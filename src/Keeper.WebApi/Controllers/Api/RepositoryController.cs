using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Repositories.Commands.CreateRepository;
using Keeper.Application.Repositories.Commands.DeleteRepository;
using Keeper.Application.Repositories.Commands.UpdateRepository;
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
    private readonly IRepositoryActivitiesService _repoService;
    private readonly ISender _mediatR;

    public RepositoryController(IRepositoryActivitiesService repoService, ISender mediatR)
    {
        _repoService = repoService;
        _mediatR = mediatR;
    }

    [HttpGet]
    public async Task<ActionResult<RepositoryModel>> GetRepositoryInfo([FromQuery] GetRepositoryQuery getRepositoryQuery)
    {
        return await _mediatR.Send(getRepositoryQuery);
    }

    [HttpPost]
    public async Task<ActionResult<RepositoryModel>> CreateRepository([FromBody] CreateRepositoryCommand createRepositoryCommand)
    {
        var repositoryId = await _mediatR.Send(createRepositoryCommand);
        return await _mediatR.Send(new GetRepositoryQuery { RepositoryId = repositoryId });
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteRepository([FromQuery] DeleteRepositoryCommand deleteRepositoryCommand)
    {
        await _mediatR.Send(deleteRepositoryCommand);
        return NoContent();
    }

    [HttpPut]
    public async Task<IActionResult> PutRepositoryUpdates([FromBody] UpdateRepositoryCommand updateRepositoryCommand)
    {
        await _mediatR.Send(updateRepositoryCommand);
        return NoContent();
    }
}