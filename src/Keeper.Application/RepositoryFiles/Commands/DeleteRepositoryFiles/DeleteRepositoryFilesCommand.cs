using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.RepositoriesAccess.Interfaces;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Commands.DeleteRepositoryFiles;

[AuthorizedRequest]
public record DeleteRepositoryFilesCommand : IRequest<int>
{
    public Guid RepositoryId { get; set; }
#nullable disable
    public IEnumerable<Guid> FileIds { get; set; }
#nullable enable
}

public class DeleteRepositoryFilesCommandHandler : IRequestHandler<DeleteRepositoryFilesCommand, int>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    public DeleteRepositoryFilesCommandHandler(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<int> Handle(DeleteRepositoryFilesCommand request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repo = await context.Repositories.Include(x => x.Owner).FirstOrDefaultAsync(x => x.Id == request.RepositoryId && x.OwnerId == user.Id);
            if (repo is not null)
            {
                var fileEntities = await context.Files.Where(x => request.FileIds.Contains(x.Id) && x.RepositoryId == request.RepositoryId).ToListAsync();

                var repoAccess = _repositoriesAccessor.OpenRepository(user.Id, request.RepositoryId);
                if (repoAccess != null && fileEntities.Count > 0)
                {
                    foreach (var file in fileEntities)
                    {
                        var fileAccess = repoAccess.OpenRepoFileAccessor(file.Id);
                        if (fileAccess != null)
                        {
                            await fileAccess.DeleteAsync();
                        }
                    }

                    context.Files.RemoveRange(fileEntities);
                    return await context.SaveChangesAsync();
                }
            }
            return 0;
        }
    }
}