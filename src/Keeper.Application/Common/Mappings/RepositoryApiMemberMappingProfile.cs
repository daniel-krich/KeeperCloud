using Keeper.Application.Common.Security;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Mapster;
using System.Text;

namespace Keeper.Application.Common.Mappings;

public class RepositoryApiMemberMappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<RepositoryApiMemberEntity, RepositoryApiMemberModel>()
            .Map(x => x.Combination, x => Convert.ToBase64String(Encoding.UTF8.GetBytes(string.Join(".", x.Id.ToString(), x.Key))));

        config.NewConfig<RepositoryApiMemberModel, UserCredentials>()
            .Map(x => x.IdentityName, x => x.Name)
            .Map(x => x.UserType, _ => UserCredentialsType.RepositoryMember);

        config.Compile();
    }
}