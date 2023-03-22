namespace Keeper.Application.Common.Models;

public class JwtSettings
{
#nullable disable
    public string Key { get; set; }
    public string JwtRefreshCookieName { get; set; }
    public string JwtContentKey { get; set; }
    public string JwtResponseHeaderName { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
#nullable enable
}
