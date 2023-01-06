using System.ComponentModel.DataAnnotations;

namespace Keeper.Server.DTOs
{
    public class SignupRequestDTO
    {
#nullable disable
        [Required, MinLength(5), MaxLength(256)]
        public string Email { get; set; }
        [Required, MinLength(5), MaxLength(50)]
        public string Password { get; set; }
        [Required, MaxLength(60)]
        public string Firstname { get; set; }
        [Required, MaxLength(60)]
        public string Lastname { get; set; }
    }
}