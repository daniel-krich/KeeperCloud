using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Mapster;

namespace Keeper.Application.Mappings;

public class UserMappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<UserModel, UserEntity>()
            .TwoWays();

        config.NewConfig<UserModel, IDictionary<string, object>>()
            .NameMatchingStrategy(NameMatchingStrategy.ToCamelCase);

        config.Compile();

    }
}