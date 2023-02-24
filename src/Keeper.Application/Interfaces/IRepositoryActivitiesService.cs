using Keeper.Application.Models;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;

namespace Keeper.Application.Interfaces;

public interface IRepositoryActivitiesService
{
    Task<RepositoryActivityModel?> CreateActivity(Guid repositoryId, string identity, RepositoryActivity operationId, string operationContext);
    Task<PaginationWrapperModel<RepositoryActivityModel>> GetActivitiesPaginated(Guid repositoryId, int page, int maxRecordsPerPage);
}
