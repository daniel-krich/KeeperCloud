namespace Keeper.RepositoriesAccess.Interfaces;

public interface IRepositoriesAccessor
{
    IRepository? CreateRepository(Guid userId);
    IRepository? OpenRepository(Guid userId, Guid repositoryId);
}