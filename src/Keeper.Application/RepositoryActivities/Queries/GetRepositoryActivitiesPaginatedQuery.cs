using Keeper.Application.Common.Enums;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Keeper.Application.RepositoryActivities.Queries;

[Authorize]
public record GetRepositoryActivitiesPaginatedQuery : IRequest<PaginationWrapperModel<RepositoryActivityModel>>
{
    public Guid repositoryId { get; set; }
    public int page { get; set; }
    public int maxRecordsPerPage { get; set; }
}

public class GetRepositoryActivitiesPaginatedQueryHandler : IRequestHandler<GetRepositoryActivitiesPaginatedQuery, PaginationWrapperModel<RepositoryActivityModel>>
{
    private readonly IKeeperDbContextFactory _contextFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;

    public GetRepositoryActivitiesPaginatedQueryHandler(IKeeperDbContextFactory contextFactory, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _contextFactory = contextFactory;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<PaginationWrapperModel<RepositoryActivityModel>> Handle(GetRepositoryActivitiesPaginatedQuery request, CancellationToken cancellationToken)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;

            var repository = await context.Repositories.Include(x => x.Activities.OrderByDescending(y => y.CreatedDate)
                                                                    .Skip((request.page - 1) * request.maxRecordsPerPage)
                                                                    .Take(request.maxRecordsPerPage)
                                     ).Where(CreateQueryForDifferentAuthTypes(user)).FirstOrDefaultAsync(x => x.Id == request.repositoryId);

            if (repository != null)
            {
                var repositoryActivitiesAllCount = await context.RepositoryActivities.Where(x => x.RepositoryId == request.repositoryId).CountAsync();
                var activitiesModel = _mapper.Map<List<RepositoryActivityModel>>(repository.Activities);
                return new PaginationWrapperModel<RepositoryActivityModel>(activitiesModel, request.page, Convert.ToInt32(Math.Abs(repositoryActivitiesAllCount / request.maxRecordsPerPage) + 1), request.maxRecordsPerPage, repositoryActivitiesAllCount);
            }
            return new PaginationWrapperModel<RepositoryActivityModel>();
        }
    }

    private Expression<Func<RepositoryEntity, bool>> CreateQueryForDifferentAuthTypes(AuthenticatedUserModel user)
    {
        return user.AuthenticationType == AuthenticationType.Jwt ? ((x) => x.OwnerId == user.EntityId) : ((x) => x.ApiMembers.Any(y => y.Id == user.EntityId));
    }
}