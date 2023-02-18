using Keeper.Server.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Security.Claims;

namespace Keeper.Server.Helpers
{
    public static class ClaimsHelper
    {
        public static UserModel? RetreiveUserFromClaims(ClaimsPrincipal claims)
        {
            if (claims.Identity?.IsAuthenticated == true)
            {
                var rawUser = claims.FindFirst(x => x.Type == "user")?.Value;
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
                var rawMember = claims.FindFirst(x => x.Type == "member")?.Value;
                if (rawMember != null)
                {
                    var member = JsonConvert.DeserializeObject<RepositoryApiMemberFullModel>(rawMember);
                    return member;
                }
            }
            return default;
        }
    }
}