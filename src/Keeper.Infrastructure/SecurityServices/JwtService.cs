using Keeper.Application.DTOs;
using Keeper.Application.Interfaces;
using Keeper.Application.Security.Jwt.Interfaces;
using Keeper.Application.Security.Jwt.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Keeper.Infrastructure.Data;
using Keeper.Utilities;
using MapsterMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Keeper.Infrastructure.SecurityServices;

public class JwtService: IJwtService
{
    private readonly IConfiguration _configuration;
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IMapper _mapper;
    public JwtSettings JwtSettings { get; }

    public JwtService(IConfiguration configuration, IKeeperDbContextFactory keeperFactory, IMapper mapper)
    {
        _configuration = configuration;
        _keeperFactory = keeperFactory;
        _mapper = mapper;
        JwtSettings = _configuration.GetSection(nameof(JwtSettings)).Get<JwtSettings>()!;
    }

    public async Task<JwtAccessToken?> CreateTokenAsync(AuthRequestDto request)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            if (context.Users.FirstOrDefault(x => x.Email == request.Email) is UserEntity user)
            {
                if (Hashing.IsHashHmacMatch(request.Password, user.PasswordHash, user.PasswordSalt))
                {
                    UserModel userModel = _mapper.Map<UserModel>(user);
                    var jwtToken = GenerateJwt(userModel);
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
                UserModel userModel = _mapper.Map<UserModel>(refresh.Owner);
                var jwtToken = GenerateJwt(userModel);
                return new JwtAccessToken(jwtToken, refreshToken);
            }
            return default;
        }
    }

    public async Task DeleteExpiredRefreshTokens()
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            await context.Database.ExecuteSqlRawAsync($@"DELETE FROM {nameof(KeeperDbContext.RefreshTokens)}
                                                             WHERE {nameof(RefreshTokenEntity.Expires)} < @p0",
                                                         new SqlParameter("@p0", DateTime.Now));
        }
    }

    private string GenerateRefreshToken()
    {
        return Hashing.Random1024BitToken();
    }

    private string GenerateJwt(UserModel user)
    {

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: JwtSettings.Issuer,
            audience: JwtSettings.Audience,
            expires: DateTime.UtcNow.AddMinutes(10),
            signingCredentials: creds);


        token.Payload["user"] = _mapper.Map<IDictionary<string, object>>(user);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}