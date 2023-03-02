using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.RepositoryMembers.Commands.CreateRepositoryMember;
using Keeper.Application.RepositoryMembers.Commands.DeleteRepositoryMember;
using Keeper.Application.RepositoryMembers.Commands.UpdateRepositoryMember;
using Keeper.Application.RepositoryMembers.Queries.GetRepositoryMember;
using Keeper.Application.RepositoryMembers.Queries.GetRepositoryMembersPaginated;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/repository/members")]
[ApiController]
[Authorize]
public class RepositoryMembersController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ISender _mediatR;

    public RepositoryMembersController(IMapper mapper, ISender mediatR)
    {
        _mapper = mapper;
        _mediatR = mediatR;
    }

    [HttpGet]
    public async Task<ActionResult<PaginationWrapperModel<RepositoryApiMemberModel>>> GetMembersPaginated([FromQuery] GetRepositoryMembersPaginatedQuery getRepositoryMembersPaginatedQuery)
    {
        return await _mediatR.Send(getRepositoryMembersPaginatedQuery);
    }

    [HttpPost]
    public async Task<ActionResult<RepositoryApiMemberModel>> PostApiMember([FromBody] CreateRepositoryMemberCommand createRepositoryMemberCommand)
    {
        var memberId =  await _mediatR.Send(createRepositoryMemberCommand);
        return await _mediatR.Send(new GetRepositoryMemberQuery { RepositoryId = createRepositoryMemberCommand.RepositoryId, MemberId = memberId });
    }

    [HttpPut]
    public async Task<ActionResult<RepositoryApiMemberModel>> PutApiMember([FromBody] UpdateRepositoryMemberCommand updateRepositoryMemberCommand)
    {
        var memberId = await _mediatR.Send(updateRepositoryMemberCommand);
        return await _mediatR.Send(new GetRepositoryMemberQuery { RepositoryId = updateRepositoryMemberCommand.RepositoryId, MemberId = memberId });
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteApiMember([FromQuery] DeleteRepositoryMemberCommand deleteRepositoryMemberCommand)
    {
        await _mediatR.Send(deleteRepositoryMemberCommand);
        return NoContent();
    }
}