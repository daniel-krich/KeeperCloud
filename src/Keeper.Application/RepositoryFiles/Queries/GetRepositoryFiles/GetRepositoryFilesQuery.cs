using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFiles;

[AuthorizedRequest]
public record GetRepositoryFilesQuery : IRequest<List<FileModel>>
{
    public Guid RepositoryId { get; set; }
#nullable disable
    public IEnumerable<Guid> FileIds { get; set; }
#nullable enable
}

public class GetRepositoryFilesQueryHandler : IRequestHandler<GetRepositoryFilesQuery, List<FileModel>>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    public GetRepositoryFilesQueryHandler(IKeeperDbContextFactory keeperFactory, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<List<FileModel>> Handle(GetRepositoryFilesQuery request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repository = await context.Repositories.Include(x =>
                                    x.Files.Where(y => request.FileIds.Contains(y.Id)).OrderByDescending(y => y.CreatedDate)
                            ).FirstOrDefaultAsync(x => x.OwnerId == user.Id && x.Id == request.RepositoryId);
            if (repository != null)
            {
                return _mapper.Map<List<FileModel>>(repository.Files);
            }
            return new List<FileModel>();
        }
    }
}