using Keeper.RepositoriesAccess;
using Keeper.RepositoriesAccess.Interfaces;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static IServiceCollection AddRepositoriesAccess(this IServiceCollection services, Action<IRepositoriesAccessorOptions>? optionsDelegate = default)
    {
        services.AddSingleton<IRepositoriesAccessor>(_ => new RepositoriesAccessor(optionsDelegate));
        return services;
    }
}