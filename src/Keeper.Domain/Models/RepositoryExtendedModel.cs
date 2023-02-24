namespace Keeper.Domain.Models;

public class RepositoryExtendedModel : RepositoryModel
{
    public long OverallFileCount { get; set; }
    public long OverallRepositorySize { get; set; }
}
