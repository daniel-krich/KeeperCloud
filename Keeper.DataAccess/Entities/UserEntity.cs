using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Entities
{
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
        public int StorageCapacityMb { get; set; }
        [Required, MaxLength(40)]
        public string RegisterIp { get; set; }
        [Required, MaxLength(40)]
        public string LastAccessIp { get; set; }
        public virtual ICollection<FileEntity> Files { get; set; }
        public virtual ICollection<RefreshTokenEntity> RefreshTokens { get; set; }
#nullable enable
        [MaxLength(256)]
        public string? PrivateAccessApiKey { get; set; }

    }
}