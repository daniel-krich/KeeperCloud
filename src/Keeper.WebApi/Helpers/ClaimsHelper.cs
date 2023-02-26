using Keeper.Application.Common.Enums;
using Keeper.Domain.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Security.Claims;

namespace Keeper.WebApi.Helpers;

public static class ClaimsHelper
{
    public const string JwtUserClaim = "user";
    public const string ApiMemberClaim = "member";
    public static UserModel? RetreiveUserFromClaims(ClaimsPrincipal claims)
    {
        if (claims.Identity?.IsAuthenticated == true)
        {
            var rawUser = claims.FindFirst(x => x.Type == JwtUserClaim)?.Value;
            if (rawUser != null)
            {
                var settings = new JsonSerializerSettings
                {
                    ContractResolver = new DefaultContractResolver
                    {
                        NamingStrategy = new CamelCaseNamingStrategy()
                    }
                };
                var user = JsonConvert.DeserializeObject<UserModel>(rawUser, settings);
                return user;
            }
        }
        return default;
    }

    public static RepositoryApiMemberFullModel? RetreiveFullMemberFromClaims(ClaimsPrincipal claims)
    {
        if (claims.Identity?.IsAuthenticated == true)
        {
            var rawMember = claims.FindFirst(x => x.Type == ApiMemberClaim)?.Value;
            if (rawMember != null)
            {
                var member = JsonConvert.DeserializeObject<RepositoryApiMemberFullModel>(rawMember);
                return member;
            }
        }
        return default;
    }

    public static AuthenticationType GetAuthenticationType(ClaimsPrincipal claims)
    {
        switch(claims.Claims.LastOrDefault()?.Type)
        {
            case JwtUserClaim:
                return AuthenticationType.Jwt;
            case ApiMemberClaim:
                return AuthenticationType.MemberKey;
            default:
                return AuthenticationType.None;
        }
    }
}