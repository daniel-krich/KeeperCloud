using Keeper.Application.DTOs;
using Keeper.Domain.Models;

namespace Keeper.Application.Interfaces;

public interface IRepositoryApiMembersService
{
    Task<List<RepositoryApiMemberModel>?> FetchAllApiMembers(Guid userId, Guid repositoryId);
    Task<RepositoryApiMemberModel?> CreateApiMember(Guid userId, Guid repositoryId, CreateOrUpdateApiMemberRequestDto apiMemberRequest);
    Task<RepositoryApiMemberModel?> UpdateApiMember(Guid userId, Guid repositoryId, Guid memberId, CreateOrUpdateApiMemberRequestDto apiMemberRequest);
    Task<bool> DeleteApiMember(Guid userId, Guid repositoryId, Guid memberId);
}