using Keeper.Application.Common.Interfaces;
using Keeper.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryMembers.Commands.DeleteRepositoryMember;

public record DeleteRepositoryMemberCommand : IRequest<bool>
{
    public Guid RepositoryId { get; set; }
    public Guid MemberId { get; set; }
}


public class DeleteRepositoryMemberCommandHandler : IRequestHandler<DeleteRepositoryMemberCommand, bool>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    public DeleteRepositoryMemberCommandHandler(IKeeperDbContextFactory keeperFactory, IAuthenticatedUserService authenticatedUserService, IRepositoryActivitiesService repositoryActivitiesService)
    {
        _keeperFactory = keeperFactory;
        _authenticatedUserService = authenticatedUserService;
        _repositoryActivitiesService = repositoryActivitiesService;
    }

    public async Task<bool> Handle(DeleteRepositoryMemberCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repositoryApiMember = await context.Repositories.Where(x => x.OwnerId == user.Id && x.Id == request.RepositoryId).Select(x => x.ApiMembers.FirstOrDefault(y => y.Id == request.MemberId)).FirstOrDefaultAsync();
            if (repositoryApiMember != null)
            {
                context.RepositoryApiMembers.Remove(repositoryApiMember);
                await context.SaveChangesAsync();
                await _repositoryActivitiesService.AddRepositoryActivity(request.RepositoryId, RepositoryActivity.RemoveApiMember, user.IdentityName!, user.UserType, $"Removed: {repositoryApiMember.Name}");
                return true;
            }
            return false;
        }
    }
}