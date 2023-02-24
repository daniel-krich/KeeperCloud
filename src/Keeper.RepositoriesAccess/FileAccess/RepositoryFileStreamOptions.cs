using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;

namespace Keeper.RepositoriesAccess.FileAccess;

internal class RepositoryFileStreamOptions : IRepositoryFileStreamOptions
{
    public RepositoryFileStreamMode Mode { get; set; }
    public bool Encryption { get; set; }
    public byte[]? Key { get; set; }
    public byte[]? IV { get; set; }
    public bool Compression { get; set; }
}