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
        RuleFor(x => x.Offset)
            .GreaterThanOrEqualTo(0).WithMessage("Offset should be non-negative.");
    }
}