namespace Keeper.Server.JwtSecurity
{
    public class JwtAccessToken
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }

        public JwtAccessToken(string token, string refreshToken)
        {
            Token = token;
            RefreshToken = refreshToken;
        }
    }
}
