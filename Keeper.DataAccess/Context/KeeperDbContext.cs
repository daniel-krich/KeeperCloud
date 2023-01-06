using Keeper.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Context
{
    public class KeeperDbContext : DbContext
    {
#nullable disable
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<FileEntity> EncryptedFiles { get; set; }
        public DbSet<RefreshTokenEntity> RefreshTokens { get; set; }
#nullable enable

        private readonly IConfiguration _configuration;
        public KeeperDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("KeeperDb"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>().HasIndex(x => x.Email).IsUnique();
        }
    }
}
