using System.ComponentModel.DataAnnotations;

namespace Keeper.Server.DTOs
{
    public class TokenRefreshRequestDTO
    {
#nullable disable
        [Required]
        public string RefreshToken { get; set; }
    }
}