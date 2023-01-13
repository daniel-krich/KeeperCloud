using Keeper.RepositoriesMaster.Enums;
using Keeper.RepositoriesMaster.FileAccess;

namespace Keeper.Server.Models
{
    public class FileStreamWithMetaModel
    {
        public string Name { get; }
        public IRepositoryFile? RepositoryFile { get; }
        public byte[] Key { get; }
        public byte[] IV { get; }

        public FileStreamWithMetaModel(string name, byte[] key, byte[] iV, IRepositoryFile? repositoryFile)
        {
            RepositoryFile = repositoryFile;
            Name = name;
            Key = key;
            IV = iV;
        }

        public Task<Stream> OpenStreamAsync(RepositoryFileStreamMode mode)
        {
            if(RepositoryFile is null)
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
}
