using System.ComponentModel.DataAnnotations;

namespace Keeper.Server.DTOs
{
    public class AuthRequestDTO
    {
#nullable disable
        [Required, MinLength(5), MaxLength(256)]
        public string Email { get; set; }
        [Required, MinLength(5), MaxLength(50)]
        public string Password { get; set; }
    }
}
