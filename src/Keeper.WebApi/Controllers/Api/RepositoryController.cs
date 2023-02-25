using Keeper.Application.DTOs;
using Keeper.Application.Interfaces;
using Keeper.Domain.Models;
using Keeper.WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class RepositoryController : ControllerBase
{
    private readonly IRepositoryService _repoService;

    public RepositoryController(IRepositoryService repoService)
    {
        _repoService = repoService;
    }

    [HttpGet("{repositoryId:guid}")]
    public async Task<IActionResult> GetRepositoryInfo([FromRoute] Guid repositoryId)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            RepositoryModel? repositoriesBatch = await _repoService.GetRepositoryByUser(user.Id, repositoryId);
            if (repositoriesBatch != null) return Ok(repositoriesBatch);
            else return NotFound();
        }
        return BadRequest();
    }

    [HttpPost("create")]
    public async Task<IActionResult> PostNewRepository([FromBody] CreateRepositoryRequestDto createRepoRequest)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if(user != null)
        {
            var repo = await _repoService.CreateRepository(user.Id, createRepoRequest);
            if(repo != null)
            {
                return Ok(repo);
            }
        }
        return BadRequest();
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
                return Ok();
            }
        }
        return BadRequest();
    }
}