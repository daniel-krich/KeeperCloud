using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Repositories.Queries.GetRepositoriesBatched;
using Keeper.Domain.Models;
using Keeper.WebApi.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class RepositoriesController : ControllerBase
{
    private readonly IRepositoryActivitiesService _repoService;
    private readonly ISender _mediatR;

    public RepositoriesController(IRepositoryActivitiesService repoService, ISender mediatR)
    {
        _repoService = repoService;
        _mediatR = mediatR;
    }

    [HttpGet]
    public async Task<ActionResult<BatchWrapperModel<RepositoryModel>>> GetRepositoriesBatched([FromQuery] GetRepositoriesBatchedQuery getRepositoriesBatchedQuery)
    {
        return await _mediatR.Send(getRepositoriesBatchedQuery);
    }
}