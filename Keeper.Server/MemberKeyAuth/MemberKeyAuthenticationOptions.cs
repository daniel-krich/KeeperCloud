using Microsoft.AspNetCore.Authentication;

namespace Keeper.Server.MemberKeyAuth
{
    public class MemberKeyAuthenticationOptions : AuthenticationSchemeOptions
    {
        public const string DefaultScheme = "MemberKeyAuth";
        public const string HeaderName = "Authorization";
        public string Scheme => DefaultScheme;
        public string AuthenticationType = DefaultScheme;
    }
}