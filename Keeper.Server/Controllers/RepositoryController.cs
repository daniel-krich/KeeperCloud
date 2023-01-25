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
    public class RepositoryController : ControllerBase
    {
        private readonly IRepositoryService _repoService;
        private readonly IMapper _mapper;

        private const int _batchTakeRepositoryLimit = 50;

        private const int _batchTakeRepositoryFilesLimit = 200;

        public RepositoryController(IRepositoryService repoService, IMapper mapper)
        {
            _repoService = repoService;
            _mapper = mapper;
        }

        [HttpGet("{repositoryId:guid}")]
        public async Task<IActionResult> GetRepositoryInfo(Guid repositoryId)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user != null)
            {
                RepositoryModel? repositoriesBatch = await _repoService.GetRepository(user.Id, repositoryId);
                if (repositoriesBatch != null) return Ok(repositoriesBatch);
                else return NotFound();
            }
            return BadRequest();
        }

        [HttpGet("{repositoryId:guid}/files")]
        public async Task<IActionResult> GetRepositoryFilesBatched(Guid repositoryId, int batchOffset = 0, int take = _batchTakeRepositoryFilesLimit)
        {
            if (take > _batchTakeRepositoryFilesLimit)
                take = _batchTakeRepositoryFilesLimit;

            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user != null)
            {
                BatchWrapperModel<FileModel> filesBatch = await _repoService.GetRepositoryFilesBatch(user.Id, repositoryId, batchOffset, take);
                return Ok(filesBatch);
            }
            return BadRequest();
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetRepositoriesBatched(int batchOffset = 0)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user != null)
            {
                BatchWrapperModel<RepositoryModel> repositoriesBatch = await _repoService.GetRepositoriesBatch(user.Id, batchOffset, _batchTakeRepositoryLimit);
                return Ok(repositoriesBatch);
            }
            return BadRequest();
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRepository([FromBody] CreateRepositoryRequestDTO createRepoRequest)
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
    }
}
