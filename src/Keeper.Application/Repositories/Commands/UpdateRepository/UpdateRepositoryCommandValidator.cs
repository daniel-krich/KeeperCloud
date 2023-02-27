using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Repositories.Commands.UpdateRepository;

public class UpdateRepositoryCommandValidator : AbstractValidator<UpdateRepositoryCommand>
{
    public UpdateRepositoryCommandValidator()
    {
        RuleFor(x => x.Name)
            .MaximumLength(60).WithMessage("Name is too long, cannot exceed 60 characters.");

        RuleFor(x => x.Description)
            .MaximumLength(256).WithMessage("Description is too long, cannot exceed 256 characters.");
    }
}