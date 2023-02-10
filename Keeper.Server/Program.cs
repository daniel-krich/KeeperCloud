using Keeper.DataAccess.Context;
using Keeper.DataAccess.Extensions;
using Keeper.RepositoriesMaster.Extensions;
using Keeper.Server.HostedServices;
using Keeper.Server.JwtSecurity;
using Keeper.Server.Services;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using System.IO.Compression;
using System.Reflection;
using System.Text;

var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
logger.Info("Application init.");

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Configuration.AddJsonFile("hostsettings.json", optional: true);

    builder.Logging.ClearProviders();
    builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Information);
    builder.Host.UseNLog();

    builder.Services.AddResponseCompression(options =>
    {
        options.Providers.Add<BrotliCompressionProvider>();
        options.Providers.Add<GzipCompressionProvider>();
    });

    builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
    {
        options.Level = CompressionLevel.Fastest;
    });

    builder.Services.Configure<GzipCompressionProviderOptions>(options =>
    {
        options.Level = CompressionLevel.Fastest;
    });

    builder.Services.AddControllers();

    builder.Services.UseKeeperDbContextFactory();

    builder.Services.AddSingleton<IJwtService, JwtService>();
    builder.Services.AddSingleton<IAuthService, AuthService>();
    builder.Services.AddSingleton<IRepositoryService, RepositoryService>();
    builder.Services.AddSingleton<IRepositoryApiMembersService, RepositoryApiMembersService>();

    builder.Services.AddHostedService<AutomatedTimingActionHostedService>();

    builder.Services.AddRepositoriesMaster();


    builder.Services.AddSingleton<IMapper, Mapper>((provider) =>
    {
        var typeAdapterConfig = TypeAdapterConfig.GlobalSettings;
        typeAdapterConfig.Scan(Assembly.GetExecutingAssembly());
        return new Mapper(typeAdapterConfig);
    });

    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "AllowAllOrigins",
                          builder =>
                          {
                              builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                          //.WithMethods("OPTIONS", "GET");
                      });
    });

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options =>
    {

        options.RequireHttpsMetadata = true;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
            ValidAudience = builder.Configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"])),
            ClockSkew = TimeSpan.Zero
        };
    });

    var app = builder.Build();

    // Configure the HTTP request pipeline.

    app.UseCors("AllowAllOrigins");

    app.UseStaticFiles();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.MapFallbackToFile("index.html");

    app.Run();
}
catch (Exception exception)
{
    logger.Error(exception, "Application setup error.");
    throw;
}
finally
{
    LogManager.Shutdown();
}