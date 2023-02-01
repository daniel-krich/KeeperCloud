using Keeper.DataAccess.Entities;
using Keeper.Server.Models;
using Mapster;

namespace Keeper.Server.MapConfigurations
{
    public class RepositoryExtendedMappingProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<RepositoryEntity, RepositoryExtendedModel>()
                .TwoWays();

            config.Compile();
        }
    }
}