using Keeper.RepositoriesAccess.Enums;

namespace Keeper.RepositoriesAccess.Interfaces;

public interface IRepositoryFile
{
    Guid FileId { get; set; }

    /// <summary>
    /// Opens a read/write stream to the file.
    /// </summary>
    /// <param name="streamOptions">Options action, use to configure the stream mode, compression or encryption.</param>
    /// <param name="token">Cancel token.</param>
    /// <returns>A file stream wrapped in a compression and encryption stream pipe.</returns>
    ///
    Task<Stream> OpenWriteStreamAsync(byte[]? key = default, byte[]? iv = default, bool compression = default, CancellationToken token = default);
    Task<Stream> OpenReadStreamAsync(byte[]? key = default, byte[]? iv = default, bool compression = default, CancellationToken token = default);

    /// <summary>
    /// Delete current file that this object represent.
    /// </summary>
    /// <param name="token">Cancel token.</param>
    /// <returns>True if file deleted, otherwise false.</returns>
    Task<bool> DeleteAsync(CancellationToken token = default);
}