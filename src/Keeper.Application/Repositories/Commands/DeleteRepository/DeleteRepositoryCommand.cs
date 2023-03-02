using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Application.Common.Security.Attributes;
using Keeper.RepositoriesAccess.Interfaces;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Repositories.Commands.DeleteRepository;

[AuthorizedUserRequest]
public record DeleteRepositoryCommand : IRequest<bool>
{
    public Guid RepositoryId { get; set; }
}

public class DeleteRepositoryCommandHandler : IRequestHandler<DeleteRepositoryCommand, bool>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    public DeleteRepositoryCommandHandler(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<bool> Handle(DeleteRepositoryCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repo = await context.Repositories.FirstOrDefaultAsync(x => x.Id == request.RepositoryId && x.OwnerId == user.Id);
            if (repo is not null)
            {
                var repoAccess = _repositoriesAccessor.OpenRepository(user.Id, request.RepositoryId);
                if (repoAccess != null)
                {
                    if (await repoAccess.DeleteRepository())
                    {
                        context.Repositories.Remove(repo);
                        await context.SaveChangesAsync();
                        return true;
                    }
                }
            }
            return false;
        }
    }
}