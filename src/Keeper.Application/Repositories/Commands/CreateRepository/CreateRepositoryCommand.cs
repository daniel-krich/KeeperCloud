using Keeper.Application.Common.Exceptions;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Application.Repositories.Exceptions;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Interfaces;
using MapsterMapper;
using MediatR;

namespace Keeper.Application.Repositories.Commands.CreateRepository;

[AuthorizedRequest]
public record CreateRepositoryCommand : IRequest<Guid>
{
    public string? Name { get; set; }
    public string? Description { get; set; }
}

public class CreateRepositoryCommandHandler : IRequestHandler<CreateRepositoryCommand, Guid>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    public CreateRepositoryCommandHandler(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<Guid> Handle(CreateRepositoryCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repo = _repositoriesAccessor.CreateRepository(user.Id);
            if (repo != null)
            {
                var repoEntity = new RepositoryEntity
                {
                    Id = repo.RepositoryId,
                    OwnerId = repo.OwnerId,
                    Name = request.Name,
                    Description = request.Description,
                    AllowAnonymousFileRead = false
                };
                context.Repositories.Add(repoEntity);
                await context.SaveChangesAsync();
                return repoEntity.Id;
            }
            throw new CreateRepositoryException();
        }
    }
}