using FluentValidation;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFiles;

public class GetRepositoryFilesQueryValidator : AbstractValidator<GetRepositoryFilesQuery>
{
    private const int BatchTakeMax = 200;

    public GetRepositoryFilesQueryValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id cannot be empty or null.");

        RuleFor(x => x.FileIds)
            .NotEmpty().WithMessage("File ids should not be null or empty.");
    }
}