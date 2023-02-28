using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Commands.UploadRepositoryFiles;

public class UploadRepositoryFilesCommandValidator : AbstractValidator<UploadRepositoryFilesCommand>
{
    public UploadRepositoryFilesCommandValidator()
    {
        RuleFor(x => x.RepositoryId)
            .NotEmpty().WithMessage("Repository id cannot be empty or null.");

        RuleFor(x => x.Files)
            .NotEmpty().WithMessage("Files should not be empty.");
    }
}