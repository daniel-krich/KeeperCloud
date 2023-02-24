using Keeper.RepositoriesAccess.Interfaces;

namespace Keeper.RepositoriesAccess.FileAccess;

internal class Repository : IRepository
{
    public Guid RepositoryId { get; set; }
    public Guid OwnerId { get; set; }
    public string RootPath { get; }

    public Repository(Guid ownerId, string rootPath)
    {
        RepositoryId = Guid.NewGuid();
        OwnerId = ownerId;
        RootPath = rootPath;
    }

    public Repository(Guid ownerId, Guid repositoryId, string rootPath) : this(ownerId, rootPath)
    {
        RepositoryId = repositoryId;
    }

    public void CreateFolder()
    {
        Directory.CreateDirectory(Path.Combine(RootPath, OwnerId.ToString(), RepositoryId.ToString()));
    }

    public IRepositoryFile CreateRepoFileAccessor()
    {
        string rootPath = Path.Combine(RootPath, OwnerId.ToString(), RepositoryId.ToString());
        return new RepositoryFile(rootPath);
    }
        

    public IRepositoryFile? OpenRepoFileAccessor(Guid fileId)
    {
        string rootPath = Path.Combine(RootPath, OwnerId.ToString(), RepositoryId.ToString());
        if (File.Exists(Path.Combine(rootPath, fileId.ToString())))
        {
            return new RepositoryFile(fileId, rootPath);
        }
        return null;
    }

    public async Task<bool> DeleteRepository(CancellationToken token = default)
    {
        string rootPath = Path.Combine(RootPath, OwnerId.ToString(), RepositoryId.ToString());
        if (Directory.Exists(rootPath))
        {
            try
            {
                await Task.Factory.StartNew(() => Directory.Delete(rootPath, true), token);
                return true;
            }
            catch
            {
                return false;
            }
        }
        return false;
    }
}