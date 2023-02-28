﻿namespace Keeper.Application.Common.Models;
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