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
            return default;
        }
    }
}