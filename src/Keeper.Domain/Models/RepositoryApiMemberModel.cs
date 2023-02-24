namespace Keeper.Domain.Models;

public class RepositoryApiMemberModel
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
    public string? Combination { get; set; }
    public RepositoryPermissionFlags PermissionFlags { get; set; }
}
