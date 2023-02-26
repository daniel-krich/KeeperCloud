using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using Keeper.Utilities;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Infrastructure.Services;

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
            var repositoryWithApiMembers = await context.Repositories.Include(x => x.ApiMembers.OrderByDescending(y => y.CreatedDate)).Where(x => x.Id == repositoryId && x.OwnerId == userId).FirstOrDefaultAsync();
            if (repositoryWithApiMembers != null)
            {
                return _mapper.Map<List<RepositoryApiMemberModel>>(repositoryWithApiMembers.ApiMembers);
            }
            return default;
        }
    }

    public async Task<RepositoryApiMemberModel?> CreateApiMember(Guid userId, Guid repositoryId, CreateOrUpdateApiMemberRequestDto apiMemberRequest)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repository = await context.Repositories.Where(x => x.OwnerId == userId && x.Id == repositoryId).FirstOrDefaultAsync();
            if(repository != null)
            {
                var member = new RepositoryApiMemberEntity
                {
                    Name = apiMemberRequest.Name,
                    Role = apiMemberRequest.Role,
                    RepositoryId = repositoryId,
                    PermissionFlags = apiMemberRequest.PermissionFlags,
                    Key = Hashing.Random1024BitToken()
                };
                context.RepositoryApiMembers.Add(member);
                await context.SaveChangesAsync();
                return _mapper.Map<RepositoryApiMemberModel>(member);
            }
            return default;
        }
    }

    public async Task<RepositoryApiMemberModel?> UpdateApiMember(Guid userId, Guid repositoryId, Guid memberId, CreateOrUpdateApiMemberRequestDto apiMemberRequest)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repositoryApiMember = await context.Repositories.Where(x => x.OwnerId == userId && x.Id == repositoryId).Select(x => x.ApiMembers.FirstOrDefault(y => y.Id == memberId)).FirstOrDefaultAsync();
            if (repositoryApiMember != null)
            {
                repositoryApiMember.Name = apiMemberRequest.Name;
                repositoryApiMember.Role = apiMemberRequest.Role;
                repositoryApiMember.PermissionFlags = apiMemberRequest.PermissionFlags;
                context.RepositoryApiMembers.Update(repositoryApiMember);
                await context.SaveChangesAsync();
                return _mapper.Map<RepositoryApiMemberModel>(repositoryApiMember);
            }
            return default;
        }
    }

    public async Task<bool> DeleteApiMember(Guid userId, Guid repositoryId, Guid memberId)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var repositoryApiMember = await context.Repositories.Where(x => x.OwnerId == userId && x.Id == repositoryId).Select(x => x.ApiMembers.FirstOrDefault(y => y.Id == memberId)).FirstOrDefaultAsync();
            if (repositoryApiMember != null)
            {
                context.RepositoryApiMembers.Remove(repositoryApiMember);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}