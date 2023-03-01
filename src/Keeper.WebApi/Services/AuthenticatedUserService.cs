using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Domain.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace Keeper.WebApi.Services;

using static Keeper.WebApi.Helpers.ClaimsHelper;

public class AuthenticatedUserService : IAuthenticatedUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;
    public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor, IMapper mapper)
    {
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    public UserCredentials? User
    {
        get
        {
            UserCredentials? temp = null;
            if (_httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true && _httpContextAccessor.HttpContext?.User is ClaimsPrincipal claims)
            {
                if (_httpContextAccessor.HttpContext.User.Identity.AuthenticationType == MemberKeyAuthenticationOptions.DefaultScheme)
                {
                    var member = RetreiveMemberFromClaims(claims);
                    if (member != null)
                        temp = _mapper.Map<UserCredentials>(member);
                }
                else
                {
                    var user = RetreiveUserFromClaims(claims);
                    if (user != null)
                        temp = _mapper.Map<UserCredentials>(user);
                }
            }
            return temp;
        }
    }

    public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true;

    public string? IP => _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.MapToIPv4().ToString();
}