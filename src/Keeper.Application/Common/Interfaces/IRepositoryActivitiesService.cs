using Keeper.Application.Common.Models;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;

namespace Keeper.Application.Common.Interfaces;

public interface IRepositoryActivitiesService
{
    Task<RepositoryActivityModel?> CreateActivity(Guid repositoryId, string identity, RepositoryActivity operationId, string operationContext);
    Task<PaginationWrapperModel<RepositoryActivityModel>> GetActivitiesPaginated(Guid userId, Guid repositoryId, int page, int maxRecordsPerPage);
}
