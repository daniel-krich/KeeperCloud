using Keeper.DataAccess.Entities;
using Keeper.DataAccess.Factories;
using Keeper.Server.DTOs;
using Keeper.Server.JwtSecurity;
using Keeper.Server.Utils;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Server.Services
{
    public interface IAuthService
    {
        Task<bool> CreateAccount(SignupRequestDTO request, string? ip);
        Task<JwtAccessToken?> GetAccessTokenForCredentials(AuthRequestDTO request);
        Task<JwtAccessToken?> GetAccessTokenForRefresh(string refreshToken);
    }

    public class AuthService : IAuthService
    {
        private readonly IJwtService _jwtService;
        private readonly IKeeperDbContextFactory _keeperDbFactory;
        public AuthService(IJwtService jwtService, IKeeperDbContextFactory keeperDbFactory)
        {
            _jwtService = jwtService;
            _keeperDbFactory = keeperDbFactory;
        }

        public async Task<bool> CreateAccount(SignupRequestDTO request, string? ip)
        {
            using (var context = _keeperDbFactory.CreateDbContext())
            {
                try
                {
                    if (await context.Users.FirstOrDefaultAsync(x => x.Email == request.Email) == null)
                    {
                        HashingUtil.HashHmac(request.Password, out var hash, out var salt);
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

        public Task<JwtAccessToken?> GetAccessTokenForCredentials(AuthRequestDTO request)
        {
            return _jwtService.CreateTokenAsync(request);
        }

        public Task<JwtAccessToken?> GetAccessTokenForRefresh(string refreshToken)
        {
            return _jwtService.CreateTokenAsync(refreshToken);
        }
    }
}