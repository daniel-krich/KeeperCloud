using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFileStream;

public class GetRepositoryFileStreamQueryValidator : AbstractValidator<GetRepositoryFileStreamQuery>
{
    public GetRepositoryFileStreamQueryValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id cannot be empty or null.");

        RuleFor(x => x.FileId)
            .NotEmpty().WithMessage("File id cannot be empty or null.");
    }
}