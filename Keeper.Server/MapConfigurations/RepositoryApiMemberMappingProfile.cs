using Keeper.DataAccess.Entities;
using Keeper.Server.Models;
using Mapster;

namespace Keeper.Server.MapConfigurations
{
    public class RepositoryApiMemberMappingProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<RepositoryApiMemberEntity, RepositoryApiMemberModel>()
                .Map(x => x.Combination, x => x.Id.ToString() + ":" + x.Key);

            config.Compile();
        }
    }
}