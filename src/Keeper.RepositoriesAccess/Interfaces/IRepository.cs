namespace Keeper.RepositoriesAccess.Interfaces
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
        Task<bool> DeleteRepository(CancellationToken token = default);
    }
}
