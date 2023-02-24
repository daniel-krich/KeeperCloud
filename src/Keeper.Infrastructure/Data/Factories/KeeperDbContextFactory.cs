using Keeper.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Keeper.Infrastructure.Data.Factories;

public class KeeperDbContextFactory : IKeeperDbContextFactory
{
    private readonly DbContextOptions _options;
    public KeeperDbContextFactory(DbContextOptions options)
    {
        _options = options;
    }

    public IKeeperDbContext CreateDbContext()
    {
        var context = new KeeperDbContext(_options);
        return context;
    }
}