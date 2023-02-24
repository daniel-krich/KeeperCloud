using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Mapster;

namespace Keeper.Application.Mappings;

public class RepositoryMappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<RepositoryEntity, RepositoryModel>()
            .TwoWays();

        config.NewConfig<RepositoryEntity, RepositoryExtendedModel>()
            .TwoWays();

        config.Compile();
    }
}
