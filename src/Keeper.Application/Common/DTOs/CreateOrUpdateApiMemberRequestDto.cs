using Keeper.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Keeper.Application.Common.DTOs;

public class CreateOrUpdateApiMemberRequestDto
{
#nullable disable
    [Required, MaxLength(64)]
    public string Name { get; set; }
    [Required, MaxLength(64)]
    public string Role { get; set; }
    [Required]
    public RepositoryPermissionFlags PermissionFlags { get; set; }
}