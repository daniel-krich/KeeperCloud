﻿using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
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

namespace Keeper.Application.Repositories.Queries.GetRepositoriesBatched;

[AuthorizedRequest]
public record GetRepositoriesBatchedQuery : IRequest<BatchWrapperModel<RepositoryModel>>
{
    public int BatchOffset { get; set; }
    public int BatchTakeLimit { get; set; }
}

public class GetRepositoriesBatchedQueryHandler : IRequestHandler<GetRepositoriesBatchedQuery, BatchWrapperModel<RepositoryModel>>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    public GetRepositoriesBatchedQueryHandler(IKeeperDbContextFactory keeperFactory, IAuthenticatedUserService authenticatedUserService, IMapper mapper)
    {
        _keeperFactory = keeperFactory;
        _authenticatedUserService = authenticatedUserService;
        _mapper = mapper;
    }

    public async Task<BatchWrapperModel<RepositoryModel>> Handle(GetRepositoriesBatchedQuery request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repositoriesFragments = await (from repo in context.Repositories
                                               where repo.OwnerId == user.Id
                                               select new
                                               {
                                                   Repo = repo,
                                                   OverallFileCount = repo.Files.Count(),
                                                   OverallRepositorySize = repo.Files.Sum(f => f.FileSize)
                                               }).OrderByDescending(x => x.Repo.CreatedDate).Skip(request.BatchOffset).Take(request.BatchTakeLimit).ToListAsync();

            var repositories = repositoriesFragments.Select(x =>
            {
                var repo = _mapper.Map<RepositoryModel>(x.Repo);
                repo.OverallFileCount = x.OverallFileCount;
                repo.OverallRepositorySize = x.OverallRepositorySize;
                return repo;
            }).ToList();

            var howMuchReposLeftCount = (await context.Repositories.Where(x => x.OwnerId == user.Id).CountAsync()) - request.BatchOffset - repositories.Count;
            return new BatchWrapperModel<RepositoryModel>(repositories, request.BatchOffset, howMuchReposLeftCount);
        }
    }
}