using Keeper.Application.Common.Models;
using Keeper.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Common.Interfaces;

public interface IAuthenticatedUserService
{
    UserModel? User { get; }
    bool IsAuthenticated { get; }
    string? IP { get; }
}