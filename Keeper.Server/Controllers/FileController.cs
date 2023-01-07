using System;
using System.IO;
using System.IO.Compression;
using System.Security.Cryptography;
using ICSharpCode.SharpZipLib.Zip;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {

        private static readonly byte[] _key;
        private static readonly byte[] _iv;

        static FileController()
        {
            using (var aes = Aes.Create())
            {
                _key = aes.Key;
                _iv = aes.IV;
            }
        }

        public FileController()
        {
            // Generate a random key and IV
            /*using (var aes = Aes.Create())
            {
                _key = aes.Key;
                _iv = aes.IV;
            }*/
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile([FromForm] IEnumerable<IFormFile> files)
        {
            foreach (var file in files)
            {
                using (var fileStream = new FileStream("temp/" + file.FileName, FileMode.Create))
                using (var aes = Aes.Create())
                using (var encryptor = aes.CreateEncryptor(_key, _iv))
                using (var encryptionStream = new CryptoStream(fileStream, encryptor, CryptoStreamMode.Write))
                using (var compressionStream = new GZipStream(encryptionStream, CompressionMode.Compress))
                {
                    await file.CopyToAsync(compressionStream);
                }
            }

            return Ok();
        }


        [HttpGet]
        public async Task DownloadFile(string fileName)
        {
            Response.Headers.Add("Content-Disposition", "attachment; filename=" + fileName);

            using (var fileStream = new FileStream("temp/" + fileName, FileMode.Open))
            using (var aes = Aes.Create())
            using (var decryptor = aes.CreateDecryptor(_key, _iv))
            using (var encryptionStream = new CryptoStream(fileStream, decryptor, CryptoStreamMode.Read))
            using (var compressionStream = new GZipStream(encryptionStream, CompressionMode.Decompress))
            {
                await compressionStream.CopyToAsync(Response.Body);
            }
        }

        [HttpGet("many")]
        public async Task DownloadMany(string fileName)
        {
            Response.ContentType = "application/zip";
            Response.Headers.Add("Content-Disposition", "attachment; filename=archive.zip");

            using (var zipStream = new ZipOutputStream(Response.Body))
            {
                //foreach (var filePath in filePaths)
                {
                    // Add the file to the zip archive
                    var entry = new ZipEntry(Path.GetFileName(fileName));
                    await zipStream.PutNextEntryAsync(entry);

                    using (var fileStream = new FileStream("temp/" + fileName, FileMode.Open))
                    using (var aes = Aes.Create())
                    using (var decryptor = aes.CreateDecryptor(_key, _iv))
                    using (var encryptionStream = new CryptoStream(fileStream, decryptor, CryptoStreamMode.Read))
                    using (var compressionStream = new GZipStream(encryptionStream, CompressionMode.Decompress))
                    {
                        await compressionStream.CopyToAsync(zipStream);
                    }

                    /*// Write the contents of the file to the zip archive
                    using (var fileStream = new FileStream("temp/" + fileName, FileMode.Open, FileAccess.Read))
                    {
                        var buffer = new byte[1024];
                        int bytesRead;
                        while ((bytesRead = await fileStream.ReadAsync(buffer, 0, buffer.Length)) > 0)
                        {
                            await zipStream.WriteAsync(buffer, 0, bytesRead);
                        }
                    }*/
                }
            }
        }
    }
}