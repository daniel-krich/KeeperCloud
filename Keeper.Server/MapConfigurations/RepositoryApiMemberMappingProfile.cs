﻿using Keeper.DataAccess.Entities;
using Keeper.Server.Models;
using Mapster;
using System.Text;

namespace Keeper.Server.MapConfigurations
{
    public class RepositoryApiMemberMappingProfile : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<RepositoryApiMemberEntity, RepositoryApiMemberModel>()
                .Map(x => x.Combination, x => Convert.ToBase64String(Encoding.UTF8.GetBytes(string.Join(".", x.Id.ToString(), x.RepositoryId.ToString(), x.Key))));

            config.NewConfig<RepositoryApiMemberEntity, RepositoryApiMemberFullModel>()
               .Map(x => x.Combination, x => Convert.ToBase64String(Encoding.UTF8.GetBytes(string.Join(".", x.Id.ToString(), x.RepositoryId.ToString(), x.Key))))
               .Map(x => x.UserOwnerId, x => x.Repository == null ? default : x.Repository.OwnerId);

            config.Compile();
        }
    }
}