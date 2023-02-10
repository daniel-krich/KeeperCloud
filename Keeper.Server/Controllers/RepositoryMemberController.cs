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


        [HttpGet("all")]
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

    }
}