using Keeper.Application.Common.Interfaces;
using Keeper.WebApi.Binders;
using Keeper.WebApi.Middlewares;
using Keeper.WebApi.Services;
using Microsoft.AspNetCore.ResponseCompression;
using NLog;
using NLog.Web;
using System.IO.Compression;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static WebApplicationBuilder ConfigureLogger(this WebApplicationBuilder builder)
    {
        var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();
        logger.Info("Web api init.");
        builder.Configuration.AddJsonFile("hostsettings.json", optional: true);
        builder.Logging.ClearProviders();
        builder.Logging.SetMinimumLevel(Logging.LogLevel.Information);
        builder.Host.UseNLog();
        return builder;
    }

    public static IServiceCollection AddWebApiServices(this IServiceCollection services)
    {
        services.AddResponseCompression(options =>
        {
            options.Providers.Add<BrotliCompressionProvider>();
            options.Providers.Add<GzipCompressionProvider>();
        });

        services.Configure<BrotliCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);
        services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);

        services.AddControllers(options =>
        {
            options.ModelBinderProviders.Insert(0, new FileUploadBinderProvider(new FileUploadBinder()));
        });
        services.AddCors(options =>
        {
            options.AddPolicy(name: "AllowAllOrigins",
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
                });
        });

        services.AddHttpContextAccessor();

        services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();

        services.AddSingleton<UnhandledExceptionMiddleware>();

        return services;
    }
}