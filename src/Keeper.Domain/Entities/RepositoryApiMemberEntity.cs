namespace Keeper.Domain.Entities;

public class RepositoryApiMemberEntity: BaseEntity
{
#nullable disable
    [Required, MaxLength(64)]
    public string Name { get; set; }
    [Required, MaxLength(64)]
    public string Role { get; set; }

    [Required, MaxLength(256)]
    public string Key { get; set; }

    [Required]
    public RepositoryPermissionFlags PermissionFlags { get; set; }

    public Guid RepositoryId { get; set; }
    [ForeignKey(nameof(RepositoryId))]
    public virtual RepositoryEntity Repository { get; set; }
}
