using Keeper.Application.Common.Security;

namespace Keeper.Application.Common.Interfaces;

public interface IAuthenticatedUserService
{
    UserCredentials? User { get; }
    bool IsAuthenticated { get; }
    string? IP { get; }
}