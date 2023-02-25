using System.IO.Compression;
using Keeper.Application.Interfaces;
using Keeper.Application.Models;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.WebApi.Helpers;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/repository/{repositoryId:guid}/activities")]
[ApiController]
[Authorize]
public class RepositoryActivitiesController : ControllerBase
{
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    private readonly IMapper _mapper;
    private readonly ILogger<StorageController> _logger;

    private const int _maxItemsPerPage = 20;

    public RepositoryActivitiesController(IRepositoryActivitiesService repositoryActivitiesService, IMapper mapper, ILogger<StorageController> logger)
    {
        _repositoryActivitiesService = repositoryActivitiesService;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetPaginationRepositoryActivities([FromRoute] Guid repositoryId, [FromQuery] int page)
    {
        UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            var paginationModel = await _repositoryActivitiesService.GetActivitiesPaginated(user.Id, repositoryId, page, _maxItemsPerPage);
            if (paginationModel != null)
            {
                return Ok(paginationModel);
            }
        }
        return BadRequest();
    }
}