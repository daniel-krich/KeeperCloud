using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Application.RepositoryMembers.Commands.UpdateRepositoryMember;

public record UpdateRepositoryMemberCommand : IRequest<Guid>
{
    public Guid RepositoryId { get; set; }
    public Guid MemberId { get; set; }
#nullable disable
    public CreateOrUpdateApiMemberRequestDto Member { get; set; }
#nullable enable
}

public class UpdateRepositoryMemberCommandHandler : IRequestHandler<UpdateRepositoryMemberCommand, Guid>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    public UpdateRepositoryMemberCommandHandler(IKeeperDbContextFactory keeperFactory, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<Guid> Handle(UpdateRepositoryMemberCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repositoryApiMember = await context.Repositories.Where(x => x.OwnerId == user.Id && x.Id == request.RepositoryId).Select(x => x.ApiMembers.FirstOrDefault(y => y.Id == request.MemberId)).FirstOrDefaultAsync();
            if (repositoryApiMember != null)
            {
                repositoryApiMember.Name = request.Member.Name;
                repositoryApiMember.Role = request.Member.Role;
                repositoryApiMember.PermissionFlags = request.Member.PermissionFlags;
                context.RepositoryApiMembers.Update(repositoryApiMember);
                await context.SaveChangesAsync();
                return repositoryApiMember.Id;
            }
            return default;
        }
    }
}