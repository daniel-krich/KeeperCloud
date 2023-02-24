namespace Keeper.Domain.Entities;

public class RepositoryActivityEntity: BaseEntity
{
#nullable disable
    [Required]
    public RepositoryActivity OperationId { get; set; }
    [Required, MaxLength(256)]
    public string Identity { get; set; }
    [Required, MaxLength(256)]
    public string OperationContext { get; set; }
    public Guid RepositoryId { get; set; }
    [ForeignKey(nameof(RepositoryId))]
    public virtual RepositoryEntity Repository { get; set; }
}
