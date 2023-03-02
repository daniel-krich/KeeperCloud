using FluentValidation;

namespace Keeper.Application.RepositoryActivities.Queries.GetRepositoryActivitiesPaginated;

public class GetRepositoryMembersPaginatedQueryValidator: AbstractValidator<GetRepositoryActivitiesPaginatedQuery>
{
    public GetRepositoryMembersPaginatedQueryValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id is required.");

        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1).WithMessage("Page must be greater than or equal to 1.");
    }
}