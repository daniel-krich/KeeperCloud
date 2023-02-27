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

[AuthorizedRequest]
public record GetRepositoryActivitiesPaginatedQuery : IRequest<PaginationWrapperModel<RepositoryActivityModel>>
{
    public Guid RepositoryId { get; set; }
    public int Page { get; set; }
    public int MaxRecordsPerPage { get; set; }
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
                                                                    .Skip((request.Page - 1) * request.MaxRecordsPerPage)
                                                                    .Take(request.MaxRecordsPerPage)
                                     ).FirstOrDefaultAsync(x => x.Id == request.RepositoryId && x.OwnerId == user.Id);

            if (repository != null)
            {
                var repositoryActivitiesAllCount = await context.RepositoryActivities.Where(x => x.RepositoryId == request.RepositoryId).CountAsync();
                var activitiesModel = _mapper.Map<List<RepositoryActivityModel>>(repository.Activities);
                return new PaginationWrapperModel<RepositoryActivityModel>(activitiesModel, request.Page, Convert.ToInt32(Math.Abs(repositoryActivitiesAllCount / request.MaxRecordsPerPage) + 1), request.MaxRecordsPerPage, repositoryActivitiesAllCount);
            }
            return new PaginationWrapperModel<RepositoryActivityModel>();
        }
    }
}