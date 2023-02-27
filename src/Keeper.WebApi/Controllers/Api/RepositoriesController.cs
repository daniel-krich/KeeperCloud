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
    private readonly IRepositoryService _repoService;
    private readonly ISender _mediatR;

    private const int _batchTakeRepositoryLimit = 20;

    public RepositoriesController(IRepositoryService repoService, ISender mediatR)
    {
        _repoService = repoService;
        _mediatR = mediatR;
    }

    [HttpGet]
    public async Task<ActionResult<BatchWrapperModel<RepositoryModel>>> GetRepositoriesBatched([FromQuery] int offset = 0)
    {
        return await _mediatR.Send(new GetRepositoriesBatchedQuery { BatchOffset = offset, BatchTakeLimit = _batchTakeRepositoryLimit });
    }
}