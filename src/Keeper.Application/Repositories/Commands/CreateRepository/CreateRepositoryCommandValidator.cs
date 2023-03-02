using FluentValidation;

namespace Keeper.Application.Repositories.Commands.CreateRepository;

public class CreateRepositoryCommandValidator: AbstractValidator<CreateRepositoryCommand>
{
    public CreateRepositoryCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(64).WithMessage("Max Name length is 64.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(256).WithMessage("Max description length is 64.");
    }
}
