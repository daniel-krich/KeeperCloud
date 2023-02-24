using Keeper.DataAccess.Context;
using Keeper.DataAccess.Factories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Tests.Context
{
    public class KeeperDbContextTests : KeeperDbContext
    {
        public KeeperDbContextTests(): base(null!) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "KeeperDbTests");
        }

    }

    public class KeeperDbContextTestsFactory : KeeperDbContextFactory
    {
        public KeeperDbContextTestsFactory() : base(null!)
        {
        }

        public override KeeperDbContextTests CreateDbContext()
        {
            return new KeeperDbContextTests();
        }
    }
}
