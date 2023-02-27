using FluentValidation;
using Keeper.Application.Common.Interfaces;
using Keeper.Domain.Enums;
using MapsterMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryMembers.Commands.UpdateRepositoryMember;

public class UpdateRepositoryMemberCommandValidator : AbstractValidator<UpdateRepositoryMemberCommand>
{
    public UpdateRepositoryMemberCommandValidator()
    {

        RuleFor(x => x.Member)
            .NotNull().WithMessage("Member cannot be null.");

        RuleFor(x => x.Member.Name)
            .NotEmpty().WithMessage("Name cannot be empty.")
            .MaximumLength(64).WithMessage("Max name length is 64 characters.");

        RuleFor(x => x.Member.Role)
            .NotEmpty().WithMessage("Role cannot be empty.")
            .MaximumLength(64).WithMessage("Max role length is 64 characters.");
    }
}