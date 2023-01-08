using System;
using System.IO;
using System.IO.Compression;
using System.Security.Cryptography;
using System.Text.Json;
using ICSharpCode.SharpZipLib.Zip;
using Keeper.RepositoriesMaster.Enums;
using Keeper.RepositoriesMaster.Master;
using Keeper.Server.Helpers;
using Keeper.Server.Models;
using Keeper.Server.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Keeper.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private IRepositoriesMaster _repoMaster;
        private IRepositoryService _repositoryService;
        private IMapper _mapper;

        public FileController(IRepositoriesMaster repoMaster, IRepositoryService repositoryService, IMapper mapper)
        {
            _repoMaster = repoMaster;
            _repositoryService = repositoryService;
            _mapper = mapper;
        }

        [HttpPost("upload")]
        [DisableRequestSizeLimit]
        [Authorize]
        public async Task<IActionResult> UploadFile(Guid repositoryId, [FromForm] IEnumerable<IFormFile> files)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user is not null)
            {
                var res = await _repositoryService.CreateFilesByForm(user.Id, repositoryId, files);
                return Ok(res);
            }
            return Ok();
        }


        [HttpGet]
        public async Task DownloadFile(string fileName)
        {
            Response.Headers.Add("Content-Disposition", "attachment; filename=" + fileName);

            /*using (var fileStream = new FileStream("temp/" + fileName, FileMode.Open))
            using (var aes = Aes.Create())
            using (var decryptor = aes.CreateDecryptor(_key, _iv))
            using (var encryptionStream = new CryptoStream(fileStream, decryptor, CryptoStreamMode.Read))
            using (var compressionStream = new GZipStream(encryptionStream, CompressionMode.Decompress))
            {
                await compressionStream.CopyToAsync(Response.Body);
            }*/
        }

        [HttpGet("many")]
        public async Task DownloadMany(string fileName)
        {
            Response.ContentType = "application/zip";
            Response.Headers.Add("Content-Disposition", "attachment; filename=archive.zip");

            /*using (var zipStream = new ZipOutputStream(Response.Body))
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

                    // Write the contents of the file to the zip archive
                    using (var fileStream = new FileStream("temp/" + fileName, FileMode.Open, FileAccess.Read))
                    {
                        var buffer = new byte[1024];
                        int bytesRead;
                        while ((bytesRead = await fileStream.ReadAsync(buffer, 0, buffer.Length)) > 0)
                        {
                            await zipStream.WriteAsync(buffer, 0, bytesRead);
                        }
                    }
                }
            }*/
        }
    }
}