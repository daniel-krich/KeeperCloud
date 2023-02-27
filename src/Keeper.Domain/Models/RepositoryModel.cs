namespace Keeper.Domain.Models;

public class RepositoryModel
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public bool AllowAnonymousFileRead { get; set; }
    public long OverallFileCount { get; set; }
    public long OverallRepositorySize { get; set; }
    public DateTime CreatedDate { get; set; }
}
