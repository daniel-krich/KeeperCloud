using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Commands.DeleteRepositoryFiles;

public class DeleteRepositoryFilesCommandValidator : AbstractValidator<DeleteRepositoryFilesCommand>
{
    public DeleteRepositoryFilesCommandValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id cannot be empty or null.");

        RuleFor(x => x.FileIds)
            .NotEmpty().WithMessage("File ids should not be null or empty.");
    }
}
