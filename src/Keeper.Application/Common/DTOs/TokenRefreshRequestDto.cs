using System.ComponentModel.DataAnnotations;

namespace Keeper.Application.Common.DTOs;

public class TokenRefreshRequestDto
{
#nullable disable
    [Required]
    public string RefreshToken { get; set; }
}