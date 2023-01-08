using Keeper.DataAccess.Entities;
using Keeper.Server.Models;
using Mapster;

namespace Keeper.Server.MapConfigurations
{
    public class RepositoryMappingProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<RepositoryEntity, RepositoryModel>()
                .TwoWays();

            config.Compile();
        }
    }
}
