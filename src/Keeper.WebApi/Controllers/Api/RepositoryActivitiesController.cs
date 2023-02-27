using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.RepositoryActivities.Queries.GetRepositoryActivitiesPaginated;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/repository/activities")]
[ApiController]
[Authorize]
public class RepositoryActivitiesController : ControllerBase
{
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    private readonly IMapper _mapper;
    private readonly ISender _mediator;
    private readonly ILogger<RepositoryActivitiesController> _logger;

    public RepositoryActivitiesController(IRepositoryActivitiesService repositoryActivitiesService, IMapper mapper, ILogger<RepositoryActivitiesController> logger, ISender mediator)
    {
        _repositoryActivitiesService = repositoryActivitiesService;
        _mapper = mapper;
        _logger = logger;
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<PaginationWrapperModel<RepositoryActivityModel>>> GetPaginationRepositoryActivities([FromQuery] GetRepositoryActivitiesPaginatedQuery getRepositoryActivitiesPaginatedQuery)
    {
        return await _mediator.Send(getRepositoryActivitiesPaginatedQuery);
    }
}