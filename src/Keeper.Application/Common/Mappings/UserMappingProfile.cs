using Keeper.Application.Common.Security;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Mapster;

namespace Keeper.Application.Common.Mappings;

public class UserMappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<UserModel, UserEntity>()
            .TwoWays();

        config.NewConfig<UserModel, UserCredentials>()
            .Map(x => x.IdentityName, x => x.Email)
            .Map(x => x.UserType, _ => UserCredentialsType.DefaultUser);

        config.NewConfig<UserModel, IDictionary<string, object>>()
            .NameMatchingStrategy(NameMatchingStrategy.ToCamelCase);

        config.Compile();

    }
}