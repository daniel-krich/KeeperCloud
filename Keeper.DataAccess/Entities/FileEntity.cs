using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Entities
{
    public class FileEntity : BaseEntity
    {
#nullable disable
        [Required, MaxLength(256)]
        public string FileName { get; set; }
        [Required]
        public byte[] EncryptKey { get; set; }
        [Required]
        public float FileSize { get; set; }
        public bool IsPublic { get; set; }
        public bool IsFolder { get; set; }
        //

        public Guid ParentId { get; set; }

        [ForeignKey(nameof(ParentId))]
        public virtual FileEntity Parent { get; set; }

        public virtual ICollection<FileEntity> Children { get; set; }

        //
        [Required]
        public Guid OwnerId { get; set; }
        [ForeignKey(nameof(OwnerId))]
        public virtual UserEntity Owner { get; set; }
#nullable enable

        [MaxLength(256)]
        public string? PublicAccessKey { get; set; }
    }
}