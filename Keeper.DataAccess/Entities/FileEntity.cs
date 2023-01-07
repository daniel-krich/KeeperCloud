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
        public string Name { get; set; }

        [Required]
        public byte[] EncKey { get; set; }
        [Required]
        public byte[] EncIV { get; set; }

        [Required]
        public long FileSize { get; set; }

        public bool IsPublic { get; set; }
        //

        [Required]
        public Guid RepositoryId { get; set; }

        [ForeignKey(nameof(RepositoryId))]
        public virtual RepositoryEntity Repository { get; set; }

#nullable enable

        [MaxLength(256)]
        public string? PublicAccessKey { get; set; }
    }
}