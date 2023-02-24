namespace Keeper.Domain.Entities;

public class RefreshTokenEntity : BaseEntity
{
#nullable disable
    [Required, MaxLength(256)]
    public string RefreshToken { get; set; }
    [Required]
    public DateTime Expires { get; set; }
    [Required]
    public Guid OwnerId { get; set; }
    [ForeignKey(nameof(OwnerId))]
    public virtual UserEntity Owner { get; set; }

}
