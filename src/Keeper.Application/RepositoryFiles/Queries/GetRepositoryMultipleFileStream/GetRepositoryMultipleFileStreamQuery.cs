using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Application.RepositoryFiles.Exceptions;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryMultipleFileStream;

[AuthorizedRequest]
public record GetRepositoryMultipleFileStreamQuery : IRequest<IAsyncEnumerable<RepositoryFileWithStream>>
{
    public Guid RepositoryId { get; set; }
#nullable disable
    public IEnumerable<Guid> FileIds { get; set; }
#nullable enable
}

public class GetRepositoryMultipleFileStreamQueryHandler : IRequestHandler<GetRepositoryMultipleFileStreamQuery, IAsyncEnumerable<RepositoryFileWithStream>>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    public GetRepositoryMultipleFileStreamQueryHandler(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor, IAuthenticatedUserService authenticatedUserService, IMapper mapper)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _authenticatedUserService = authenticatedUserService;
        _mapper = mapper;
    }

    public Task<IAsyncEnumerable<RepositoryFileWithStream>> Handle(GetRepositoryMultipleFileStreamQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(GatherFileStreams(request));
    }

    private async IAsyncEnumerable<RepositoryFileWithStream> GatherFileStreams(GetRepositoryMultipleFileStreamQuery request)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repo = await context.Repositories.Include(x => x.Files.Where(y => request.FileIds.Contains(y.Id))).FirstOrDefaultAsync(x => x.Id == request.RepositoryId && x.OwnerId == user.Id);
            if (repo is not null)
            {
                var repoAccess = _repositoriesAccessor.OpenRepository(user.Id, repo.Id);
                if (repoAccess != null)
                {
                    foreach (var fileEntity in repo.Files)
                    {
                        var file = repoAccess?.OpenRepoFileAccessor(fileEntity.Id);
                        if (repo != null && file != null)
                        {
                            Stream fileStream = await file.OpenStreamAsync(options =>
                            {
                                options.Mode = RepositoryFileStreamMode.Read;
                                options.Key = fileEntity.EncKey;
                                options.IV = fileEntity.EncIV;
                                options.Encryption = true;
                                options.Compression = true;
                            }, default);

                            yield return new RepositoryFileWithStream(_mapper.Map<FileModel>(fileEntity), fileStream);
                        }
                    }
                }
            }
        }
    }
}