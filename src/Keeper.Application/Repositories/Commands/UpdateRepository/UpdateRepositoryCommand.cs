using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Application.Repositories.Commands.UpdateRepository;

[AuthorizedRequest]
public record UpdateRepositoryCommand : IRequest<bool>
{
    public Guid RepositoryId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public bool? AllowAnonymousFileRead { get; set; }
}

public class UpdateRepositoryCommandHandler : IRequestHandler<UpdateRepositoryCommand, bool>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    public UpdateRepositoryCommandHandler(IKeeperDbContextFactory keeperFactory, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<bool> Handle(UpdateRepositoryCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repo = await context.Repositories.Include(x => x.Owner).FirstOrDefaultAsync(x => x.Id == request.RepositoryId && x.OwnerId == user.Id);
            if (repo is not null)
            {
                if (request.Name != null)
                    repo.Name = request.Name;

                if (request.Description != null)
                    repo.Description = request.Description;

                if (request.AllowAnonymousFileRead.HasValue)
                    repo.AllowAnonymousFileRead = request.AllowAnonymousFileRead.Value;

                context.Repositories.Update(repo);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}