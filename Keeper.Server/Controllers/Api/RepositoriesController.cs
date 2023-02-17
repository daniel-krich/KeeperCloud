using Keeper.Server.DTOs;
using Keeper.Server.Helpers;
using Keeper.Server.Models;
using Keeper.Server.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.Server.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RepositoriesController : ControllerBase
    {
        private readonly IRepositoryService _repoService;
        private readonly IMapper _mapper;

        private const int _batchTakeRepositoryLimit = 20;

        public RepositoriesController(IRepositoryService repoService, IMapper mapper)
        {
            _repoService = repoService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetRepositoriesBatched([FromQuery] int offset = 0)
        {
            if (offset < 0)
                offset = 0;

            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user != null)
            {
                BatchWrapperModel<RepositoryExtendedModel> repositoriesBatch = await _repoService.GetRepositoriesBatch(user.Id, offset, _batchTakeRepositoryLimit);
                return Ok(repositoriesBatch);
            }
            return BadRequest();
        }
    }
}