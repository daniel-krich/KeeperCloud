using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.WebApi.Helpers;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/repository/{repositoryId:guid}/members")]
[ApiController]
[Authorize]
public class RepositoryMembersController : ControllerBase
{
    private readonly IRepositoryApiMembersService _repoMembersService;
    private readonly IMapper _mapper;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;

    public RepositoryMembersController(IRepositoryApiMembersService repoMembersService, IMapper mapper, IRepositoryActivitiesService repositoryActivitiesService)
    {
        _repoMembersService = repoMembersService;
        _mapper = mapper;
        _repositoryActivitiesService = repositoryActivitiesService;
    }


    [HttpGet]
    public async Task<IActionResult> GetAllMembers([FromRoute] Guid repositoryId)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            var apiMemberList = await _repoMembersService.FetchAllApiMembers(user.Id, repositoryId);
            if (apiMemberList != null)
            {
                return Ok(apiMemberList);
            }
        }
        return BadRequest();
    }

    [HttpPost]
    public async Task<IActionResult> PostApiMember([FromRoute] Guid repositoryId, [FromBody] CreateOrUpdateApiMemberRequestDto apiMemberRequest)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            var apiMember = await _repoMembersService.CreateApiMember(user.Id, repositoryId, apiMemberRequest);
            if (apiMember != null)
            {
                await _repositoryActivitiesService.CreateActivity(repositoryId, user.Email!, RepositoryActivity.AddApiMember, $"Added {apiMember.Name}");
                return Ok(apiMember);
            }
            else
            {
                return BadRequest("Error while trying to create api member.");
            }
        }
        return BadRequest();
    }

    [HttpPut("{memberId:guid}")]
    public async Task<IActionResult> PutApiMember([FromRoute] Guid repositoryId, [FromRoute] Guid memberId, [FromBody] CreateOrUpdateApiMemberRequestDto apiMemberRequest)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            var apiMember = await _repoMembersService.UpdateApiMember(user.Id, repositoryId, memberId, apiMemberRequest);
            if (apiMember != null)
            {
                await _repositoryActivitiesService.CreateActivity(repositoryId, user.Email!, RepositoryActivity.UpdateApiMember, $"Updated {apiMember.Name}");
                return Ok(apiMember);
            }
            else
            {
                return BadRequest("Error while trying to update api member.");
            }
        }
        return BadRequest();
    }

    [HttpDelete("{memberId:guid}")]
    public async Task<IActionResult> DeleteApiMember([FromRoute] Guid repositoryId, [FromRoute] Guid memberId)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            if(await _repoMembersService.DeleteApiMember(user.Id, repositoryId, memberId))
            {
                await _repositoryActivitiesService.CreateActivity(repositoryId, user.Email!, RepositoryActivity.DeleteFilesFromRepository, $"Deleted member");
                return Ok();
            }
            else
            {
                return BadRequest("Error while trying to delete api member.");
            }
        }
        return BadRequest();
    }
}