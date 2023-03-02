using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Models;

namespace Keeper.Application.Common.Interfaces;

public interface IJwtService
{
    Task<JwtAccessToken?> CreateTokenAsync(AuthRequestDto request);
    Task<JwtAccessToken?> CreateTokenAsync(string refreshToken);
    Task DeleteExpiredRefreshTokens();
    JwtSettings JwtSettings { get; }
}