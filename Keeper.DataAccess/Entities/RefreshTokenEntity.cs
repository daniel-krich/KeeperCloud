using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Entities
{
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
}