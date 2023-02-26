using Keeper.Application.Common.Enums;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
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

    public AuthenticatedUserModel? User
    {
        get
        {
            if (_httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true && _httpContextAccessor.HttpContext?.User is ClaimsPrincipal claims)
            {
                var authType = GetAuthenticationType(claims);
                switch(authType)
                {
                    case AuthenticationType.Jwt:
                        var user = RetreiveUserFromClaims(claims);
                        if(user != null && user.Email != null)
                        {
                            return new AuthenticatedUserModel(user.Id, user.Email, AuthenticationType.Jwt);
                        }
                        break;
                    case AuthenticationType.MemberKey:
                        var member = RetreiveFullMemberFromClaims(claims);
                        if (member != null && member.Name != null)
                        {
                            return new AuthenticatedUserModel(member.Id, member.Name, AuthenticationType.MemberKey);
                        }
                        break;
                    default:
                        break;
                }
            }
            return default;
        }
    }
}