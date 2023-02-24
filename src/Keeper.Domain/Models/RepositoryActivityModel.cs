namespace Keeper.Domain.Models;

public class RepositoryActivityModel
{
    public string? OperationName { get; set; }
    public string? Identity { get; set; }
    public string? OperationContext { get; set; }
    public DateTime CreatedDate { get; set; }
}
