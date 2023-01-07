using Keeper.RepositoriesMaster;
using Keeper.RepositoriesMaster.Master;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.RepositoriesMaster.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositoriesMaster(this IServiceCollection collection)
        {
            return collection.AddRepositoriesMaster((c) => { });
        }

        public static IServiceCollection AddRepositoriesMaster(this IServiceCollection collection, Action<IRepositoriesMasterOptions> masterOptions)
        {
            collection.AddSingleton<IRepositoriesMaster>(serviceProvider =>
            {
                var master = new Master.RepositoriesMaster(masterOptions);
                return master;
            });
            return collection;
        }
    }
}