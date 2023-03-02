using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using System.Collections.Concurrent;
using System.IO.Compression;
using System.Security.Cryptography;

namespace Keeper.RepositoriesAccess.FileAccess;

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

    public async Task<Stream> OpenWriteStreamAsync(byte[]? key = null, byte[]? iv = null, bool compression = false, CancellationToken token = default)
    {
        this._deleted = false;
        //

        Stream outputStream = await OpenFileWriteStreamAsync(Path.Combine(RepositoryRootPath, FileId.ToString()), token);
        if (key != null && iv != null)
        {
            var aes = Aes.Create();
            var encryptor = aes.CreateEncryptor(key, iv);
            outputStream = new CryptoStream(outputStream, encryptor, CryptoStreamMode.Write);
        }
        if (compression)
        {
            outputStream = new GZipStream(outputStream, CompressionMode.Compress);
        }
        return outputStream;
    }

    public Task<Stream> OpenReadStreamAsync(byte[]? key = null, byte[]? iv = null, bool compression = false, CancellationToken token = default)
    {
        if (this._deleted)
            throw new FileNotFoundException();

        Stream inputStream = new FileStream(Path.Combine(RepositoryRootPath, FileId.ToString()), FileMode.Open, System.IO.FileAccess.Read, FileShare.Read);
        if (key != null && iv != null)
        {
            var aes = Aes.Create();
            var decryptor = aes.CreateDecryptor(key, iv);
            inputStream = new CryptoStream(inputStream, decryptor, CryptoStreamMode.Read);
        }
        if (compression)
        {
            inputStream = new GZipStream(inputStream, CompressionMode.Decompress);
        }

        return Task.FromResult(inputStream);
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