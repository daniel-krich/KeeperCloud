using Microsoft.AspNetCore.Authentication;

namespace Keeper.Application.Common.Security;

public class MemberKeyAuthenticationOptions: AuthenticationSchemeOptions
{
    public const string DefaultScheme = "MemberKeyAuth";
    public const string HeaderName = "Authorization";
    public string Scheme => DefaultScheme;
    public string AuthenticationType = DefaultScheme;
}