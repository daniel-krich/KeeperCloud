namespace Keeper.Domain.Entities;

public abstract class BaseEntity
{
    [Required, Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    [Required]
    public DateTime CreatedDate { get; set; }
    [Required]
    public DateTime LastModified { get; set; }
}
