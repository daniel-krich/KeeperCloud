using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Entities
{
    public abstract class BaseEntity
    {
        [Required, Key]
        public Guid Id { get; set; } = Guid.NewGuid();
        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        [Required]
        public DateTime LastModified { get; set; } = DateTime.Now;
    }
}