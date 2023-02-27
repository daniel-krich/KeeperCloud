using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFilesBatched;

public class GetRepositoryFilesBatchedQueryValidator : AbstractValidator<GetRepositoryFilesBatchedQuery>
{
    private const int BatchTakeMax = 200;

    public GetRepositoryFilesBatchedQueryValidator()
    {
        RuleFor(x => x.Offset)
            .GreaterThanOrEqualTo(0).WithMessage("Offset should be non-negative.");

        RuleFor(x => x.Take)
            .GreaterThanOrEqualTo(1).WithMessage("Cannot take less then 1.")
            .LessThanOrEqualTo(BatchTakeMax).WithMessage($"Cannot take more then {BatchTakeMax} at once.");
    }
}