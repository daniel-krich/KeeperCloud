using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Keeper.Application.Common.Interfaces;

public interface IRepositoryActivitiesService
{
    Task AddRepositoryActivity(Guid repositoryId, RepositoryActivity operationId, string identity, string operationContext = "");
}