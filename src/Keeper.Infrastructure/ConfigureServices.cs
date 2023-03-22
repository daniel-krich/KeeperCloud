using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Infrastructure.Data;
using Keeper.Infrastructure.Data.Factories;
using Keeper.Infrastructure.Handlers;
using Keeper.Infrastructure.HostedServices;
using Keeper.Infrastructure.SecurityServices;
using Keeper.Infrastructure.Services;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
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
        services.AddSingleton<IRepositoryActivitiesService, RepositoryActivitiesService>();

        services.AddRepositoriesAccess(options =>
        {
            options.FolderName = "uploads";
        });

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer()
        .AddScheme<MemberKeyAuthenticationOptions, MemberKeyAuthenticationHandler>(MemberKeyAuthenticationOptions.DefaultScheme, options => { });

        services.AddSingleton<IConfigureOptions<JwtBearerOptions>, ConfigureJwtBearerOptions>();

        return services;
    }
}