using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Keeper.Infrastructure.Services;

public class RepositoryActivitiesService : IRepositoryActivitiesService
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IMapper _mapper;
    public RepositoryActivitiesService(IKeeperDbContextFactory keeperFactory,  IMapper mapper)
    {
        _keeperFactory = keeperFactory;
        _mapper = mapper;
    }

    public async Task AddRepositoryActivity(Guid repositoryId, RepositoryActivity operationId, string identity, string operationContext = "")
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repository = await context.Repositories.FindAsync(repositoryId);
            if(repository != null)
            {
                context.RepositoryActivities.Add(new RepositoryActivityEntity
                {
                    RepositoryId = repositoryId,
                    OperationId = operationId,
                    Identity = identity,
                    OperationContext = operationContext
                });
                await context.SaveChangesAsync();
            }
        }
    }
}