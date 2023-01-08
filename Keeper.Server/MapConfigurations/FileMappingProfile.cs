using Keeper.DataAccess.Entities;
using Keeper.Server.Models;
using Mapster;

namespace Keeper.Server.MapConfigurations
{
    public class FileMappingProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<FileEntity, FileModel>()
                .TwoWays();

            config.Compile();
        }
    }
}
