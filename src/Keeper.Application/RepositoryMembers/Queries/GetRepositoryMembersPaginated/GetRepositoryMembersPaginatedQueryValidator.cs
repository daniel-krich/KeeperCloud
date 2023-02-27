using FluentValidation;

namespace Keeper.Application.RepositoryMembers.Queries.GetRepositoryMembersPaginated;

public class GetRepositoryMembersPaginatedQueryValidator: AbstractValidator<GetRepositoryMembersPaginatedQuery>
{
    public GetRepositoryMembersPaginatedQueryValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id is required.");

        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1).WithMessage("Page must be greater than or equal to 1.");
    }
}