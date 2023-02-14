using Keeper.DataAccess.Enums;
using System.ComponentModel.DataAnnotations;

namespace Keeper.Server.DTOs
{
    public class CreateOrUpdateApiMemberRequestDTO
    {
#nullable disable
        [Required, MaxLength(64)]
        public string Name { get; set; }
        [Required, MaxLength(64)]
        public string Role { get; set; }
        [Required]
        public RepositoryPermissionFlags PermissionFlags { get; set; }
    }
}
