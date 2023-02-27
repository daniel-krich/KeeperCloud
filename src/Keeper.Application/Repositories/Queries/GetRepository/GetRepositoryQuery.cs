using Keeper.Application.Common.Exceptions;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Repositories.Queries.GetRepository;

[AuthorizedRequest]
public record GetRepositoryQuery: IRequest<RepositoryModel>
{
    public Guid RepositoryId { get; set; }
}

public class GetRepositoryQueryHandler : IRequestHandler<GetRepositoryQuery, RepositoryModel>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;

    public GetRepositoryQueryHandler(IKeeperDbContextFactory keeperFactory, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<RepositoryModel> Handle(GetRepositoryQuery request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repositoryFragments = await(from repo in context.Repositories
                                            where repo.OwnerId == user.Id && repo.Id == request.RepositoryId
                                            select new
                                            {
                                                Repo = repo,
                                                OverallFileCount = repo.Files.Count(),
                                                OverallRepositorySize = repo.Files.Sum(f => f.FileSize)
                                            }).FirstOrDefaultAsync();

            if (repositoryFragments != null)
            {
                var repository = _mapper.Map<RepositoryModel>(repositoryFragments.Repo);
                repository.OverallFileCount = repositoryFragments.OverallFileCount;
                repository.OverallRepositorySize = repositoryFragments.OverallRepositorySize;
                return repository;
            }

            throw new RepositoryNotFoundException();

        }
    }
}