using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Models;

namespace Keeper.Application.Common.Interfaces;

public interface IAuthService
{
    Task<bool> CreateAccount(SignupRequestDto request, string? ip);
    Task<JwtAccessToken?> GetAccessTokenForCredentials(AuthRequestDto request);
    Task<JwtAccessToken?> GetAccessTokenForRefresh(string refreshToken);
}