using Keeper.Server.DTOs;
using Keeper.Server.Helpers;
using Keeper.Server.Models;
using Keeper.Server.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.Server.Controllers.WebApi
{
    [Route("api/repository/{repositoryId:guid}/members")]
    [ApiController]
    [Authorize]
    public class RepositoryMembersController : ControllerBase
    {
        private readonly IRepositoryApiMembersService _repoMembersService;
        private readonly IMapper _mapper;

        public RepositoryMembersController(IRepositoryApiMembersService repoMembersService, IMapper mapper)
        {
            _repoMembersService = repoMembersService;
            _mapper = mapper;
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
        public async Task<IActionResult> PostApiMember([FromRoute] Guid repositoryId, [FromBody] CreateOrUpdateApiMemberRequestDTO apiMemberRequest)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user != null)
            {
                var apiMember = await _repoMembersService.CreateApiMember(user.Id, repositoryId, apiMemberRequest);
                if (apiMember != null)
                {
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
        public async Task<IActionResult> PutApiMember([FromRoute] Guid repositoryId, [FromRoute] Guid memberId, [FromBody] CreateOrUpdateApiMemberRequestDTO apiMemberRequest)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user != null)
            {
                var apiMember = await _repoMembersService.UpdateApiMember(user.Id, repositoryId, memberId, apiMemberRequest);
                if (apiMember != null)
                {
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
}