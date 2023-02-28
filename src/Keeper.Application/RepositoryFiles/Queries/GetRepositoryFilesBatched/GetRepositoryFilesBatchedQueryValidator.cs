using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFilesBatched;

public class GetRepositoryFilesBatchedQueryValidator : AbstractValidator<GetRepositoryFilesBatchedQuery>
{
    public GetRepositoryFilesBatchedQueryValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id cannot be empty or null.");

        RuleFor(x => x.Offset)
            .GreaterThanOrEqualTo(0).WithMessage("Offset should be non-negative.");

        RuleFor(x => x.Take)
            .GreaterThanOrEqualTo(1).WithMessage("Cannot take less then 1.");
    }
}