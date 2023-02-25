using Keeper.Application.Interfaces;
using Keeper.Application.Models;
using Keeper.Domain.Models;
using Keeper.WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class RepositoriesController : ControllerBase
{
    private readonly IRepositoryService _repoService;

    private const int _batchTakeRepositoryLimit = 20;

    public RepositoriesController(IRepositoryService repoService)
    {
        _repoService = repoService;
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