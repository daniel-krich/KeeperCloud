using Keeper.Domain.Models;

namespace Keeper.Application.Common.Models;
public class JwtAccessToken
{
    public string Token { get; set; }
    public string RefreshToken { get; set; }
    public UserModel User { get; set; }

    public JwtAccessToken(UserModel user, string token, string refreshToken)
    {
        Token = token;
        RefreshToken = refreshToken;
        User = user;
    }
}