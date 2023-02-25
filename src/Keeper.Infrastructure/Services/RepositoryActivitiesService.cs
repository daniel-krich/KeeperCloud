using Keeper.Application.Interfaces;
using Keeper.Application.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Infrastructure.Services;

public class RepositoryActivitiesService : IRepositoryActivitiesService
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IMapper _mapper;
    public RepositoryActivitiesService(IKeeperDbContextFactory keeperFactory, IMapper mapper)
    {
        _keeperFactory = keeperFactory;
        _mapper = mapper;
    }

    public async Task<RepositoryActivityModel?> CreateActivity(Guid repositoryId, string identity, RepositoryActivity operationId, string operationContext)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            if (await context.Repositories.FindAsync(repositoryId) is RepositoryEntity repository)
            {
                var activity = new RepositoryActivityEntity
                {
                    RepositoryId = repository.Id,
                    OperationId = operationId,
                    Identity = identity,
                    OperationContext = operationContext
                };
                context.RepositoryActivities.Add(activity);
                await context.SaveChangesAsync();
                return _mapper.Map<RepositoryActivityModel>(activity);
            }
            return default;
        }
    }

    public async Task<PaginationWrapperModel<RepositoryActivityModel>> GetActivitiesPaginated(Guid userId, Guid repositoryId, int page, int maxRecordsPerPage)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repository = await context.Repositories.Include(x => x.Activities.OrderByDescending(y => y.CreatedDate)
                                                                    .Skip((page - 1) * maxRecordsPerPage)
                                                                    .Take(maxRecordsPerPage)
                                     ).FirstOrDefaultAsync(x => x.Id == repositoryId && x.OwnerId == userId);
            if(repository != null)
            {
                var repositoryActivitiesAllCount = await context.RepositoryActivities.Where(x => x.RepositoryId == repositoryId).CountAsync();
                var activitiesModel = _mapper.Map<List<RepositoryActivityModel>>(repository.Activities);
                return new PaginationWrapperModel<RepositoryActivityModel>(activitiesModel, page, Convert.ToInt32(Math.Abs(repositoryActivitiesAllCount / maxRecordsPerPage) + 1), maxRecordsPerPage, repositoryActivitiesAllCount);
            }
            return new PaginationWrapperModel<RepositoryActivityModel>();
        }
    }
}