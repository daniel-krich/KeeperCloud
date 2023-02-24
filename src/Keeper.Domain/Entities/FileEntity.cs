namespace Keeper.Domain.Entities;

public class FileEntity : BaseEntity
{
#nullable disable
    [Required, MaxLength(256)]
    public string Name { get; set; }

    [Required]
    public byte[] EncKey { get; set; }
    [Required]
    public byte[] EncIV { get; set; }

    [Required]
    public long FileSize { get; set; }

    [Required]
    public Guid RepositoryId { get; set; }

    [ForeignKey(nameof(RepositoryId))]
    public virtual RepositoryEntity Repository { get; set; }
}
