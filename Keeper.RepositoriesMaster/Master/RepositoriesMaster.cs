using Keeper.RepositoriesMaster.FileAccess;

namespace Keeper.RepositoriesMaster.Master
{
    public interface IRepositoriesMaster
    {
        IRepository? CreateRepository(Guid userId);
        IRepository? OpenRepository(Guid userId, Guid repositoryId);
    }

    internal class RepositoriesMaster : IRepositoriesMaster
    {
        private readonly RepositoriesMasterOptions _repositoriesOptions;

        public RepositoriesMaster(Action<IRepositoriesMasterOptions> configuration)
        {
            _repositoriesOptions = new RepositoriesMasterOptions();
            configuration.Invoke(_repositoriesOptions);
            Directory.CreateDirectory(_repositoriesOptions.ReposDirectory);
        }

        public IRepository? CreateRepository(Guid userId)
        {
            try
            {
                string path = Path.Combine(_repositoriesOptions.ReposDirectory);
                var repo = new Repository(userId, path);
                repo.CreateFolder();
                return repo;
            }
            catch
            {
                return default;
            }
        }

        public IRepository? OpenRepository(Guid userId, Guid repositoryId)
        {
            if(Directory.Exists(Path.Combine(_repositoriesOptions.ReposDirectory, userId.ToString(), repositoryId.ToString())))
            {
                return new Repository(userId, repositoryId, _repositoriesOptions.ReposDirectory);
            }
            return default;
        }
    }
}