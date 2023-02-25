using Keeper.Application.Interfaces;
using Keeper.Application.Security.Jwt.Interfaces;
using Keeper.Infrastructure.Data;
using Keeper.Infrastructure.Data.Factories;
using Keeper.Infrastructure.Data.Interceptors;
using Keeper.Infrastructure.HostedServices;
using Keeper.Infrastructure.SecurityServices;
using Keeper.Infrastructure.Services;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application.IntegrationTests;

internal class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration(configurationBuilder =>
        {
            var integrationConfig = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();

            configurationBuilder.AddConfiguration(integrationConfig);
        });

        builder.ConfigureServices((builder, services) =>
        {
            if (builder.Configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddSingleton<DbContextOptions<KeeperDbContext>>(provider =>
                    new DbContextOptionsBuilder<KeeperDbContext>().UseInMemoryDatabase("KeeperDb").Options
                );
            }
            else
            {
                services.AddSingleton<DbContextOptions<KeeperDbContext>>(provider =>
                    new DbContextOptionsBuilder<KeeperDbContext>().UseSqlServer(builder.Configuration.GetConnectionString("KeeperDb")!, b => b.MigrationsAssembly(typeof(KeeperDbContext).Assembly.FullName)).Options
                );
            }

            services.AddSingleton<IKeeperDbContextFactory, KeeperDbContextFactory>();

            services.AddSingleton<IJwtService, JwtService>();
            services.AddSingleton<IAuthService, AuthService>();
            services.AddSingleton<IRepositoryActivitiesService, RepositoryActivitiesService>();
            services.AddSingleton<IRepositoryService, RepositoryService>();
            services.AddSingleton<IRepositoryApiMembersService, RepositoryApiMembersService>();


            services.AddSingleton<IMapper, Mapper>((provider) =>
            {
                var typeAdapterConfig = TypeAdapterConfig.GlobalSettings;
                typeAdapterConfig.Scan(Assembly.GetExecutingAssembly());
                return new Mapper(typeAdapterConfig);
            });
        });
    }
}