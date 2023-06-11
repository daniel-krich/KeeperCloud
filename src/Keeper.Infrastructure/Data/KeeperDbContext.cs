using Keeper.Application.Common.Interfaces;
using Keeper.Domain.Entities;
using Keeper.Infrastructure.Data.Interceptors;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Infrastructure.Data;

public class KeeperDbContext : DbContext, IKeeperDbContext
{
#nullable disable
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<RepositoryEntity> Repositories { get; set; }
    public DbSet<RepositoryApiMemberEntity> RepositoryApiMembers { get; set; }
    public DbSet<RepositoryActivityEntity> RepositoryActivities { get; set; }
    public DbSet<FileEntity> Files { get; set; }
    public DbSet<RefreshTokenEntity> RefreshTokens { get; set; }
#nullable enable

    public KeeperDbContext(DbContextOptions<KeeperDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserEntity>().HasIndex(x => x.Email).IsUnique();
    }
}