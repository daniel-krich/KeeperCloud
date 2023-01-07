using Keeper.DataAccess.Entities;
using Keeper.Server.Models;
using Mapster;

namespace Keeper.Server.MapConfigurations
{
    public class UserMappingProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<UserModel, UserEntity>()
                .Compile();
        }
    }
}
