using FluentValidation;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Application.RepositoryMembers.Exceptions;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryMembers.Queries.GetRepositoryMember;

public class GetRepositoryMemberQueryValidator : AbstractValidator<GetRepositoryMemberQuery>
{
    public GetRepositoryMemberQueryValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id must be specified.");

        RuleFor(x => x.MemberId)
            .NotEmpty().WithMessage("Member id must be specified.");
    }
}