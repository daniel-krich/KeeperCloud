using Keeper.DataAccess.Context;
using Keeper.DataAccess.Entities;
using Keeper.DataAccess.Factories;
using Keeper.RepositoriesMaster.Enums;
using Keeper.RepositoriesMaster.FileAccess;
using Keeper.RepositoriesMaster.Master;
using Keeper.Server.DTOs;
using Keeper.Server.Models;
using Keeper.Server.Utils;
using MapsterMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text.Json;

namespace Keeper.Server.Services
{
    public interface IRepositoryApiMembersService
    {
        Task<List<RepositoryApiMemberModel>?> FetchAllApiMembers(Guid userId, Guid repositoryId);
    }

    public class RepositoryApiMembersService : IRepositoryApiMembersService
    {
        private readonly IKeeperDbContextFactory _keeperFactory;
        private readonly IMapper _mapper;
        public RepositoryApiMembersService(IKeeperDbContextFactory keeperFactory, IMapper mapper)
        {
            _keeperFactory = keeperFactory;
            _mapper = mapper;
        }

        public async Task<List<RepositoryApiMemberModel>?> FetchAllApiMembers(Guid userId, Guid repositoryId)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                var repositoryWithApiMembers = await context.Repositories.Include(x => x.ApiMembers).Where(x => x.Id == repositoryId && x.OwnerId == userId).FirstOrDefaultAsync();
                if (repositoryWithApiMembers != null)
                {
                    return _mapper.Map<List<RepositoryApiMemberModel>>(repositoryWithApiMembers.ApiMembers);
                }
                return default;
            }
        }
    }
}