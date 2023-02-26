using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;

namespace Keeper.Application.Common.Models;

public class FileStreamWithMetaModel
{
    public string Name { get; }
    public long Size { get; }
    public IRepositoryFile? RepositoryFile { get; }
    public byte[] Key { get; }
    public byte[] IV { get; }

    public FileStreamWithMetaModel(string name, long size, byte[] key, byte[] iV, IRepositoryFile? repositoryFile)
    {
        RepositoryFile = repositoryFile;
        Size = size;
        Name = name;
        Key = key;
        IV = iV;
    }

    public Task<Stream> OpenStreamAsync(RepositoryFileStreamMode mode)
    {
        if (RepositoryFile is null)
            throw new ArgumentNullException(nameof(RepositoryFile));

        return RepositoryFile.OpenStreamAsync(options =>
        {
            options.Mode = mode;
            options.Key = Key;
            options.IV = IV;
            options.Encryption = true;
            options.Compression = true;
        }, default);
    }
}
