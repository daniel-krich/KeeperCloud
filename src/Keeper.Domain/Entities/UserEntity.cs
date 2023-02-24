namespace Keeper.Domain.Entities;

public class UserEntity : BaseEntity
{
#nullable disable
    [Required, MaxLength(256)]
    public string Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
    [Required, MaxLength(60)]
    public string Firstname { get; set; }
    [Required, MaxLength(60)]
    public string Lastname { get; set; }
    public long BytesMaxStorage { get; set; }
    [Required, MaxLength(40)]
    public string RegisterIp { get; set; }
    [Required, MaxLength(40)]
    public string LastAccessIp { get; set; }
    public virtual ICollection<RepositoryEntity> Repositories { get; set; }
    public virtual ICollection<RefreshTokenEntity> RefreshTokens { get; set; }
}
