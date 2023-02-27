using System.IO.Compression;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.RepositoryActivities.Queries;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.WebApi.Helpers;
using MapsterMapper;
using MediatR;
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
    private readonly ISender _mediator;
    private readonly ILogger<StorageController> _logger;

    private const int _maxItemsPerPage = 20;

    public RepositoryActivitiesController(IRepositoryActivitiesService repositoryActivitiesService, IMapper mapper, ILogger<StorageController> logger, ISender mediator)
    {
        _repositoryActivitiesService = repositoryActivitiesService;
        _mapper = mapper;
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<PaginationWrapperModel<RepositoryActivityModel>>> GetPaginationRepositoryActivities([FromRoute] Guid repositoryId, [FromQuery] int page)
    {
        return await _mediator.Send(new GetRepositoryActivitiesPaginatedQuery { RepositoryId = repositoryId, Page = page, MaxRecordsPerPage = _maxItemsPerPage });
        /*UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
        if (user != null)
        {
            var paginationModel = await _repositoryActivitiesService.GetActivitiesPaginated(user.Id, repositoryId, page, _maxItemsPerPage);
            if (paginationModel != null)
            {
                return Ok(paginationModel);
            }
        }
        return BadRequest();*/
    }
}