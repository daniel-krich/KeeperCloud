using Keeper.Application.DTOs;
using Keeper.Application.Security.Jwt.Models;

namespace Keeper.Application.Security.Jwt.Interfaces;

public interface IJwtService
{
    Task<JwtAccessToken?> CreateTokenAsync(AuthRequestDto request);
    Task<JwtAccessToken?> CreateTokenAsync(string refreshToken);
    Task DeleteExpiredRefreshTokens();
    JwtSettings JwtSettings { get; }
}