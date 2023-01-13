using Keeper.RepositoriesMaster.Enums;
using Keeper.RepositoriesMaster.FileAccess;
using System.Collections.Concurrent;
using System.IO.Compression;
using System.Security.Cryptography;
using System.Text.Json;

namespace Keeper.RepositoriesMaster.FileAccess
{
    public interface IRepositoryFile
    {
        Guid FileId { get; set; }

        /// <summary>
        /// Opens a read/write stream to the file.
        /// </summary>
        /// <param name="streamOptions">Options action, use to configure the stream mode, compression or encryption.</param>
        /// <param name="token">Cancel token.</param>
        /// <returns>A file stream wrapped in a compression and encryption stream pipe.</returns>
        Task<Stream> OpenStreamAsync(Action<IRepositoryFileStreamOptions> streamOptions, CancellationToken token = default);


        /// <summary>
        /// Delete current file that this object represent.
        /// </summary>
        /// <param name="token">Cancel token.</param>
        /// <returns>True if file deleted, otherwise false.</returns>
        Task<bool> DeleteAsync(CancellationToken token = default);
    }

    internal class RepositoryFile : IRepositoryFile
    {
        private static ConcurrentDictionary<string, SemaphoreSlim> semaphores = new ConcurrentDictionary<string, SemaphoreSlim>();

        public Guid FileId { get; set; }
        public string RepositoryRootPath { get; set; }

        private bool _deleted = false;

        public RepositoryFile(string repositoryRootPath)
        {
            FileId = Guid.NewGuid();
            RepositoryRootPath = repositoryRootPath;
        }

        public RepositoryFile(Guid fileId, string repositoryRootPath) : this(repositoryRootPath)
        {
            FileId = fileId;
        }

        public async Task<Stream> OpenStreamAsync(Action<IRepositoryFileStreamOptions> streamOptions, CancellationToken token = default)
        {
            IRepositoryFileStreamOptions options = new RepositoryFileStreamOptions();
            streamOptions.Invoke(options);

            if (options.Mode == RepositoryFileStreamMode.Write)
            {

                this._deleted = false;
                //

                Stream outputStream = await OpenFileWriteStreamAsync(Path.Combine(RepositoryRootPath, FileId.ToString()), token);
                if (options.Encryption && options.Key != null && options.IV != null)
                {
                    var aes = Aes.Create();
                    var encryptor = aes.CreateEncryptor(options.Key, options.IV);
                    outputStream = new CryptoStream(outputStream, encryptor, CryptoStreamMode.Write);
                }
                if (options.Compression)
                {
                    outputStream = new GZipStream(outputStream, CompressionMode.Compress);
                }
                return outputStream;
            }
            else
            {
                if (this._deleted)
                    throw new FileNotFoundException();

                Stream inputStream = new FileStream(Path.Combine(RepositoryRootPath, FileId.ToString()), FileMode.Open, System.IO.FileAccess.Read, FileShare.Read);
                if (options.Encryption && options.Key != null && options.IV != null)
                {
                    var aes = Aes.Create();
                    var decryptor = aes.CreateDecryptor(options.Key, options.IV);
                    inputStream = new CryptoStream(inputStream, decryptor, CryptoStreamMode.Read);
                }
                if (options.Compression)
                {
                    inputStream = new GZipStream(inputStream, CompressionMode.Decompress);
                }
                
                return inputStream;
            }
        }

        public async Task<bool> DeleteAsync(CancellationToken token = default)
        {
            string filePath = Path.Combine(RepositoryRootPath, FileId.ToString());
            if (File.Exists(filePath))
            {
                while (!token.IsCancellationRequested && IsFileLocked(filePath))
                {
                    await Task.Delay(100, token);
                }

                if (token.IsCancellationRequested)
                {
                    token.ThrowIfCancellationRequested();
                }
                else
                {
                    File.Delete(filePath);
                    return true;
                }
            }
            return false;
        }

        private bool IsFileLocked(string filePath)
        {
            try
            {
                using (var stream = File.Open(filePath, FileMode.Open, System.IO.FileAccess.Read, FileShare.ReadWrite))
                {
                    return false;
                }
            }
            catch (IOException)
            {
                return true;
            }
        }

        private async Task<Stream> OpenFileWriteStreamAsync(string filePath, CancellationToken token = default)
        {
            var semaphore = semaphores.GetOrAdd(filePath, path => new SemaphoreSlim(1, 1));
            await semaphore.WaitAsync(token);
            try
            {
                return File.Open(filePath, FileMode.Create, System.IO.FileAccess.Write, FileShare.Read);
            }
            finally
            {
                semaphore.Release();
            }
        }
    }
}