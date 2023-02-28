using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Domain.Enums;
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
    private readonly IRepositoryActivitiesService _repositoryActivitiesService;
    public UpdateRepositoryCommandHandler(IKeeperDbContextFactory keeperFactory, IAuthenticatedUserService authenticatedUserService, IRepositoryActivitiesService repositoryActivitiesService)
    {
        _keeperFactory = keeperFactory;
        _authenticatedUserService = authenticatedUserService;
        _repositoryActivitiesService = repositoryActivitiesService;
    }

    public async Task<bool> Handle(UpdateRepositoryCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repo = await context.Repositories.Include(x => x.Owner).FirstOrDefaultAsync(x => x.Id == request.RepositoryId && x.OwnerId == user.Id);
            if (repo is not null)
            {
                var updated = new List<string>();

                if (request.Name != null)
                {
                    updated.Add(nameof(request.Name));
                    repo.Name = request.Name;
                }

                if (request.Description != null)
                {
                    updated.Add(nameof(request.Description));
                    repo.Description = request.Description;
                }

                if (request.AllowAnonymousFileRead.HasValue)
                {
                    updated.Add(nameof(request.AllowAnonymousFileRead));
                    repo.AllowAnonymousFileRead = request.AllowAnonymousFileRead.Value;
                }

                context.Repositories.Update(repo);
                await context.SaveChangesAsync();
                await _repositoryActivitiesService.AddRepositoryActivity(repo.Id, RepositoryActivity.UpdateRepository, user.Email!, $"Updated fields: {string.Join(", ", updated)}");
                return true;
            }
            return false;
        }
    }
}