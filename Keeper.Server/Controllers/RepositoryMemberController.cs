using Keeper.Server.DTOs;
using Keeper.Server.Helpers;
using Keeper.Server.Models;
using Keeper.Server.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RepositoryMemberController : ControllerBase
    {
        private readonly IRepositoryApiMembersService _repoMembersService;
        private readonly IMapper _mapper;

        public RepositoryMemberController(IRepositoryApiMembersService repoMembersService, IMapper mapper)
        {
            _repoMembersService = repoMembersService;
            _mapper = mapper;
        }


        [HttpGet("members")]
        public async Task<IActionResult> RetrieveAllMembers(Guid repositoryId)
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
        public async Task<IActionResult> CreateApiMember(Guid repositoryId, [FromBody] CreateOrUpdateApiMemberRequestDTO apiMemberRequest)
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

        [HttpPut]
        public async Task<IActionResult> UpdateApiMember(Guid repositoryId, Guid memberId, [FromBody] CreateOrUpdateApiMemberRequestDTO apiMemberRequest)
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

        [HttpDelete]
        public async Task<IActionResult> DeleteApiMember(Guid repositoryId, Guid memberId)
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