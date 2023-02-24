namespace Keeper.RepositoriesAccess.Interfaces;

public interface IRepositoriesAccessorOptions
{
    public string FullDirectory { get; }
    public string RootDirectory { get; set; }
    public string FolderName { get; set; }
    public long MaxMultipleFileSize { get; set; }
    public long MaxSingleFileSize { get; set; }
}