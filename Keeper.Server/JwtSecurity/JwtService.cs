using Keeper.DataAccess.Entities;
using Keeper.DataAccess.Factories;
using Keeper.Server.DTOs;
using Keeper.Server.Models;
using Keeper.Server.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Keeper.Server.JwtSecurity
{
    public interface IJwtService
    {
        Task<JwtAccessToken?> CreateTokenAsync(AuthRequestDTO request);
        Task<JwtAccessToken?> CreateTokenAsync(string refreshToken);
        JwtSettings JwtSettings { get; }
    }

    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        private readonly IKeeperDbContextFactory _keeperFactory;
        public JwtSettings JwtSettings { get; }

        public JwtService(IConfiguration configuration, IKeeperDbContextFactory keeperFactory)
        {
            _configuration = configuration;
            _keeperFactory = keeperFactory;
            JwtSettings = _configuration.GetSection(nameof(JwtSettings)).Get<JwtSettings>();
        }

        public async Task<JwtAccessToken?> CreateTokenAsync(AuthRequestDTO request)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                if(context.Users.FirstOrDefault(x => x.Email == request.Email) is UserEntity user)
                {
                    if(HashingUtil.IsHashHmacMatch(request.Password, user.PasswordHash, user.PasswordSalt))
                    {
                        var jwtToken = GenerateJwt(new UserModel
                        {
                            Id = user.Id,
                            Email = user.Email,
                            Firstname = user.Firstname,
                            Lastname = user.Lastname
                        });
                        var jwtRefresh = GenerateRefreshToken();
                        context.RefreshTokens.Add(new RefreshTokenEntity
                        {
                            Expires = DateTime.Now.AddDays(1),
                            RefreshToken = jwtRefresh,
                            OwnerId = user.Id,
                        });
                        await context.SaveChangesAsync();
                        return new JwtAccessToken(jwtToken, jwtRefresh);
                    }
                }
                return default;
            }
        }

        public async Task<JwtAccessToken?> CreateTokenAsync(string refreshToken)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var refresh = await (from refreshT in context.RefreshTokens.Include(x => x.Owner)
                              where refreshT.RefreshToken == refreshToken && refreshT.Expires > DateTime.Now
                              select refreshT).FirstOrDefaultAsync();
                if (refresh != null)
                {
                    var jwtToken = GenerateJwt(new UserModel
                    {
                        Id = refresh.Owner.Id,
                        Email = refresh.Owner.Email,
                        Firstname = refresh.Owner.Firstname,
                        Lastname = refresh.Owner.Lastname
                    });
                    return new JwtAccessToken(jwtToken, refreshToken);
                }
                return default;
            }
        }

        private string GenerateRefreshToken()
        {
            var bytesToken = new byte[128];
            RandomNumberGenerator.Fill(bytesToken);
            return Convert.ToBase64String(bytesToken);
        }

        private string GenerateJwt(UserModel user)
        {

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: JwtSettings.Issuer,
                audience: JwtSettings.Audience,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds);

            token.Payload["user"] = new
            {
                id = user.Id,
                email = user.Email,
                firstname = user.Firstname,
                lastname = user.Lastname,
            };

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
