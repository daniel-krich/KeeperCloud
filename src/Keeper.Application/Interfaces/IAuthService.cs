using Keeper.Application.DTOs;
using Keeper.Application.Security.Jwt.Models;

namespace Keeper.Application.Interfaces;

public interface IAuthService
{
    Task<bool> CreateAccount(SignupRequestDto request, string? ip);
    Task<JwtAccessToken?> GetAccessTokenForCredentials(AuthRequestDto request);
    Task<JwtAccessToken?> GetAccessTokenForRefresh(string refreshToken);
}