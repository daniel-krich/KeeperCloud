using System.ComponentModel.DataAnnotations;

namespace Keeper.Application.DTOs;

public class TokenRefreshRequestDto
{
#nullable disable
    [Required]
    public string RefreshToken { get; set; }
}