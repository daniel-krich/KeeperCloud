using FluentValidation;

namespace Keeper.Application.RepositoryActivities.Queries;

public class GetRepositoryActivitiesPaginatedQueryValidator: AbstractValidator<GetRepositoryActivitiesPaginatedQuery>
{
    public GetRepositoryActivitiesPaginatedQueryValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id is required.");

        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1).WithMessage("Page must be greater than or equal to 1.");

        RuleFor(x => x.MaxRecordsPerPage)
            .GreaterThanOrEqualTo(1).WithMessage("MaxRecordsPerPage must be greater than or equal to 1.");
    }
}