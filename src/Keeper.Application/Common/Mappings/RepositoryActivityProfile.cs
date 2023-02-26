using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Mapster;

namespace Keeper.Application.Common.Mappings;

public class RepositoryActivityProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<RepositoryActivityEntity, RepositoryActivityModel>()
            .Map(x => x.OperationName, x => x.OperationId.ToString());

        config.Compile();
    }
}
