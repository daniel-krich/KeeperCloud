using Keeper.Application.Common.Interfaces;
using Keeper.Infrastructure.Data.Interceptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Keeper.Infrastructure.Data.Factories;

public class KeeperDbContextFactory : IKeeperDbContextFactory
{
    private readonly DbContextOptions<KeeperDbContext> _options;
    public KeeperDbContextFactory(DbContextOptions<KeeperDbContext> options)
    {
        _options = options;
    }

    public IKeeperDbContext CreateDbContext()
    {
        var context = new KeeperDbContext(_options);
        return context;
    }
}