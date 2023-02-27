using Keeper.Application.Common.Interfaces;
using Keeper.Domain.Models;
using System.Security.Claims;

namespace Keeper.WebApi.Services;

using static Keeper.WebApi.Helpers.ClaimsHelper;

public class AuthenticatedUserService : IAuthenticatedUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public UserModel? User
    {
        get
        {
            if (_httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true && _httpContextAccessor.HttpContext?.User is ClaimsPrincipal claims)
            {
                var user = RetreiveUserFromClaims(claims);
                if(user != null)
                {
                    return user;
                }
            }
            return default;
        }
    }

    public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true;

    public string? IP => _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.MapToIPv4().ToString();
}