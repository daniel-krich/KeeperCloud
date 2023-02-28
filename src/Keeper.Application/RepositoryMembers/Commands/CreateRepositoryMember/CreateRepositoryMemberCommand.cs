using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.Utilities;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryMembers.Commands.CreateRepositoryMember;

public record CreateRepositoryMemberCommand : IRequest<Guid>
{
    public Guid RepositoryId { get; set; }
#nullable disable
    public CreateOrUpdateApiMemberRequestDto Member { get; set; }
#nullable enable
}

public class CreateRepositoryMemberHandler : IRequestHandler<CreateRepositoryMemberCommand, Guid>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    public CreateRepositoryMemberHandler(IKeeperDbContextFactory keeperFactory, IAuthenticatedUserService authenticatedUserService, IRepositoryActivitiesService repositoryActivitiesService)
    {
        _keeperFactory = keeperFactory;
        _authenticatedUserService = authenticatedUserService;
        _repositoryActivitiesService = repositoryActivitiesService;
    }

    public async Task<Guid> Handle(CreateRepositoryMemberCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repository = await context.Repositories.Where(x => x.OwnerId == user.Id && x.Id == request.RepositoryId).FirstOrDefaultAsync();
            if (repository != null)
            {
                var member = new RepositoryApiMemberEntity
                {
                    Name = request.Member.Name,
                    Role = request.Member.Role,
                    RepositoryId = request.RepositoryId,
                    PermissionFlags = request.Member.PermissionFlags,
                    Key = Hashing.Random1024BitToken()
                };
                context.RepositoryApiMembers.Add(member);
                await context.SaveChangesAsync();
                await _repositoryActivitiesService.AddRepositoryActivity(request.RepositoryId, RepositoryActivity.AddApiMember, user.Email!, $"Initial name: {member.Name}");
                return member.Id;
            }
            return default;
        }
    }
}