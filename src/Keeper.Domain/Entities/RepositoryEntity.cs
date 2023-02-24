namespace Keeper.Domain.Entities;

public class RepositoryEntity : BaseEntity
{
#nullable disable
    [Required, MaxLength(60)]
    public string Name { get; set; }
    [Required, MaxLength(256)]
    public string Description { get; set; }
    public bool AllowAnonymousFileRead { get; set; }

    public Guid OwnerId { get; set; }
    [ForeignKey(nameof(OwnerId))]
    public virtual UserEntity Owner { get; set; }
    public virtual ICollection<FileEntity> Files { get; set; }
    public virtual ICollection<RepositoryApiMemberEntity> ApiMembers { get; set; }
    public virtual ICollection<RepositoryActivityEntity> Activities { get; set; }
}
