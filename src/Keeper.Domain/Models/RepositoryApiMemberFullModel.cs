namespace Keeper.Domain.Models;

public class RepositoryApiMemberFullModel
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
    public string? Combination { get; set; }
    public RepositoryPermissionFlags PermissionFlags { get; set; }
    public Guid RepositoryId { get; set; }
    public Guid? UserOwnerId { get; set; }
}
