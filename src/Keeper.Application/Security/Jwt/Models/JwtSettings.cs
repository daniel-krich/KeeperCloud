namespace Keeper.Application.Security.Jwt.Models;

public class JwtSettings
{
#nullable disable
    public string Key { get; set; }
    public string RefreshCookie { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
#nullable enable
}
