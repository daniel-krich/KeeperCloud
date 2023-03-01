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

    public static RepositoryApiMemberModel? RetreiveMemberFromClaims(ClaimsPrincipal claims)
    {
        if (claims.Identity?.IsAuthenticated == true)
        {
            var rawMember = claims.FindFirst(x => x.Type == ApiMemberClaim)?.Value;
            if (rawMember != null)
            {
                var member = JsonConvert.DeserializeObject<RepositoryApiMemberModel>(rawMember);
                return member;
            }
        }
        return default;
    }
}