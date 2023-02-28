using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Domain.Entities;
using Keeper.Utilities;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IJwtService _jwtService;
    private readonly IKeeperDbContextFactory _keeperDbFactory;
    public AuthService(IJwtService jwtService, IKeeperDbContextFactory keeperDbFactory)
    {
        _jwtService = jwtService;
        _keeperDbFactory = keeperDbFactory;
    }

    public async Task<bool> CreateAccount(SignupRequestDto request, string? ip)
    {
        using (var context = _keeperDbFactory.CreateDbContext())
        {
            try
            {
                if (await context.Users.FirstOrDefaultAsync(x => x.Email == request.Email) == null)
                {
                    Hashing.HashHmac(request.Password, out var hash, out var salt);
                    context.Users.Add(new UserEntity
                    {
                        Email = request.Email,
                        PasswordHash = hash,
                        PasswordSalt = salt,
                        Firstname = request.Firstname,
                        Lastname = request.Lastname,
                        RegisterIp = ip,
                        LastAccessIp = ip
                    });
                    await context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }

    public Task<JwtAccessToken?> GetAccessTokenForCredentials(AuthRequestDto request)
    {
        return _jwtService.CreateTokenAsync(request);
    }

    public Task<JwtAccessToken?> GetAccessTokenForRefresh(string refreshToken)
    {
        return _jwtService.CreateTokenAsync(refreshToken);
    }
}