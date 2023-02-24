using Keeper.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Keeper.Application.Interfaces;

public interface IKeeperDbContext: IDisposable
{
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<RepositoryEntity> Repositories { get; set; }
    public DbSet<RepositoryApiMemberEntity> RepositoryApiMembers { get; set; }
    public DbSet<RepositoryActivityEntity> RepositoryActivities { get; set; }
    public DbSet<FileEntity> Files { get; set; }
    public DbSet<RefreshTokenEntity> RefreshTokens { get; set; }
    public DatabaseFacade Database { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}