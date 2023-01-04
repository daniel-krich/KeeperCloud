using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Entities
{
    public class EncryptedFileEntity : BaseEntity
    {
#nullable disable
        [Required, MaxLength(256)]
        public string FileName { get; set; }
        [Required]
        public byte[] EncryptKey { get; set; }
        [Required]
        public float FileSize { get; set; }
        public bool IsPublic { get; set; }
        [Required]
        public Guid OwnerId { get; set; }
        [ForeignKey(nameof(OwnerId))]
        public virtual UserEntity Owner { get; set; }
#nullable enable

        [MaxLength(256)]
        public string? PublicAccessKey { get; set; }
    }
}