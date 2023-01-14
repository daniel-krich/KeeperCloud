using System;
using System.IO;
using System.IO.Compression;
using System.Security.Cryptography;
using System.Text.Json;
using Keeper.RepositoriesMaster.Enums;
using Keeper.RepositoriesMaster.Master;
using Keeper.Server.Helpers;
using Keeper.Server.Models;
using Keeper.Server.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using SharpCompress.Common;
using SharpCompress.Writers;

namespace Keeper.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IRepositoriesMaster _repoMaster;
        private readonly IRepositoryService _repositoryService;
        private readonly IMapper _mapper;
        private readonly ILogger<FileController> _logger;

        public FileController(IRepositoriesMaster repoMaster, IRepositoryService repositoryService, IMapper mapper, ILogger<FileController> logger)
        {
            _repoMaster = repoMaster;
            _repositoryService = repositoryService;
            _mapper = mapper;
            _logger = logger;
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


        [HttpPost("download")]
        [Authorize]
        public async Task DownloadFiles(Guid repositoryId, [FromBody] IEnumerable<Guid> fileIds)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user is not null)
            {

                using (var archive = new ZipArchive(Response.BodyWriter.AsStream(), ZipArchiveMode.Create))
                {
                    Response.ContentType = "application/zip";
                    
                    Response.Headers.Add("Content-Disposition", $"attachment; filename={DateTime.Now}.zip");

                    var files = await _repositoryService.GetFilesReadStreams(user.Id, repositoryId, fileIds);

                    foreach (var fileAccess in files)
                    {
                        try
                        {
                            using (var fileStream = await fileAccess.OpenStreamAsync(RepositoryFileStreamMode.Read))
                            {
                                var entry = archive.CreateEntry(fileAccess.Name, CompressionLevel.Optimal);
                                using var entryStream = entry.Open();
                                await fileStream.CopyToAsync(entryStream);
                            }
                        }
                        catch
                        {
                            _logger.LogWarning($"Error while accessing file {fileAccess.Name}");
                        }
                    }
                }
            }
        }
    }
}