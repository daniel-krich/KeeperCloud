using System.ComponentModel.DataAnnotations;

namespace Keeper.Application.DTOs;

public class CreateRepositoryRequestDto
{
#nullable disable
    [Required, MaxLength(60)]
    public string Name { get; set; }
    [Required, MaxLength(256)]
    public string Description { get; set; }
}