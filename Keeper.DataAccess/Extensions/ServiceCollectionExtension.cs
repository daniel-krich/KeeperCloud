using Keeper.DataAccess.Context;
using Keeper.DataAccess.Factories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Extensions
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection UseKeeperDbContextFactory(this IServiceCollection collection)
        {
            return collection.AddSingleton<IKeeperDbContextFactory, KeeperDbContextFactory>();
        }
    }
}
