using Keeper.DataAccess.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Factories
{
    public interface IKeeperDbContextFactory : IDbContextFactory<KeeperDbContext> { }

    public class KeeperDbContextFactory : IKeeperDbContextFactory
    {
        private readonly IConfiguration _configuration;
        public KeeperDbContextFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public KeeperDbContext CreateDbContext()
        {
            return new KeeperDbContext(_configuration);
        }
    }
}