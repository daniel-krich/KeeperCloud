using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Mapster;

namespace Keeper.Application.Common.Mappings;

public class FileMappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<FileEntity, FileModel>()
            .TwoWays();

        config.Compile();
    }
}