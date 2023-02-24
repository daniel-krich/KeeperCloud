using Keeper.RepositoriesAccess.FileAccess;
using Keeper.RepositoriesAccess.Interfaces;
using Keeper.RepositoriesAccess.Models;

namespace Keeper.RepositoriesAccess;

internal class RepositoriesAccessor : IRepositoriesAccessor
{
    private readonly IRepositoriesAccessorOptions _repositoriesOptions;

    public RepositoriesAccessor(Action<IRepositoriesAccessorOptions>? optionsDelegate)
    {
        _repositoriesOptions = new RepositoriesAccessorOptions();
        optionsDelegate?.Invoke(_repositoriesOptions);
        Directory.CreateDirectory(_repositoriesOptions.FullDirectory);
    }

    public IRepository? CreateRepository(Guid userId)
    {
        try
        {
            string path = Path.Combine(_repositoriesOptions.FullDirectory);
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
        if(Directory.Exists(Path.Combine(_repositoriesOptions.FullDirectory, userId.ToString(), repositoryId.ToString())))
        {
            return new Repository(userId, repositoryId, _repositoriesOptions.FullDirectory);
        }
        return default;
    }
}