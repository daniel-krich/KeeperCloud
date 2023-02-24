using Keeper.RepositoriesAccess.Enums;

namespace Keeper.RepositoriesAccess.Interfaces;

public interface IRepositoryFileStreamOptions
{
    /// <summary>
    /// File stream mode (Write/Read)
    /// </summary>
    RepositoryFileStreamMode Mode { get; set; }

    /// <summary>
    /// Set to true if you wish to use encryption.
    /// </summary>
    bool Encryption { get; set; }

    /// <summary>
    /// Set the key for the encryption.
    /// </summary>
    byte[]? Key { get; set; }

    /// <summary>
    /// Set the IV for the encryption.
    /// </summary>
    byte[]? IV { get; set; }

    /// <summary>
    /// Set to true if you wish to compress the data on disk.
    /// </summary>
    bool Compression { get; set; }
}