using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Keeper.RepositoriesMaster.FileAccess
{
    public interface IRepository
    {
        Guid RepositoryId { get; set; }
        Guid OwnerId { get; set; }


        /// <summary>
        /// Creates an in-memory file accessor.
        /// Note: This doesn't create the file on disk.
        /// </summary>
        /// <returns>Repository in-memory file accessor.</returns>
        IRepositoryFile CreateRepoFileAccessor();

        /// <summary>
        /// Opens an in-memory file accessor.
        /// Note: This doesn't create/open streams or the file on disk.
        /// </summary>
        /// <returns>Repository in-memory file accessor.</returns>
        IRepositoryFile? OpenRepoFileAccessor(Guid fileId);

        /// <summary>
        /// Deletes the repository folder and recursively delete all files.
        /// </summary>
        /// <returns>A boolean that represents the status of the operation.</returns>
        bool DeleteRepository();
    }

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

        public bool DeleteRepository()
        {
            string rootPath = Path.Combine(RootPath, OwnerId.ToString(), RepositoryId.ToString());
            if (Directory.Exists(rootPath))
            {
                try
                {
                    Directory.Delete(rootPath, true);
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
}