using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Infrastructure.Data;
using Keeper.Infrastructure.Data.Factories;
using Keeper.Infrastructure.Data.Interceptors;
using Keeper.Infrastructure.Handlers;
using Keeper.Infrastructure.HostedServices;
using Keeper.Infrastructure.SecurityServices;
using Keeper.Infrastructure.Services;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddSingleton<DbContextOptions<KeeperDbContext>>(provider =>
                new DbContextOptionsBuilder<KeeperDbContext>().UseInMemoryDatabase("KeeperDb").Options
            );
        }
        else
        {
            services.AddSingleton<DbContextOptions<KeeperDbContext>>(provider =>
                new DbContextOptionsBuilder<KeeperDbContext>().UseSqlServer(configuration.GetConnectionString("KeeperDb")!, b => b.MigrationsAssembly(typeof(KeeperDbContext).Assembly.FullName)).Options
            );
        }

        services.AddSingleton<IKeeperDbContextFactory, KeeperDbContextFactory>();

        services.AddHostedService<AutomatedTimingActionHostedService>();

        services.AddSingleton<IJwtService, JwtService>();
        services.AddSingleton<IAuthService, AuthService>();
        services.AddSingleton<IRepositoryService, RepositoryService>();
        services.AddSingleton<IRepositoryActivitiesService, RepositoryActivitiesService>();
        services.AddSingleton<IRepositoryApiMembersService, RepositoryApiMembersService>();

        services.AddRepositoriesAccess(options =>
        {
            options.FolderName = "uploads";
        });

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
        {
            options.RequireHttpsMetadata = true;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["JwtSettings:Issuer"],
                ValidAudience = configuration["JwtSettings:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]!)),
                ClockSkew = TimeSpan.Zero
            };
        })
        .AddScheme<MemberKeyAuthenticationOptions, MemberKeyAuthenticationHandler>(MemberKeyAuthenticationOptions.DefaultScheme, options => { });

        return services;
    }
}