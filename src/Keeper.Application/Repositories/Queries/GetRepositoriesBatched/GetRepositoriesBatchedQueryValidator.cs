using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Repositories.Queries.GetRepositoriesBatched;

public class GetRepositoriesBatchedQueryValidator: AbstractValidator<GetRepositoriesBatchedQuery>
{
    public GetRepositoriesBatchedQueryValidator()
    {
        RuleFor(x => x.BatchOffset)
            .GreaterThanOrEqualTo(0).WithMessage("Offset should be non-negative.");

        RuleFor(x => x.BatchTakeLimit)
            .GreaterThanOrEqualTo(1).WithMessage("Limit should be greater or equal to 1.");
    }
}