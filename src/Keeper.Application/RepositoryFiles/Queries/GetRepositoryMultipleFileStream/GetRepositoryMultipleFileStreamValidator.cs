using FluentValidation;
using Keeper.Application.RepositoryFiles.Queries.GetRepositoryMultipleFileStream;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFileStream;

public class GetRepositoryMultipleFileStreamValidator : AbstractValidator<GetRepositoryMultipleFileStreamQuery>
{
    public GetRepositoryMultipleFileStreamValidator()
    {
        RuleFor(x => x.FileIds)
            .NotEmpty().WithMessage("File ids should not be empty or null.");
    }
}