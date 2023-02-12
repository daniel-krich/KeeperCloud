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
    [Authorize]
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
        public async Task<IActionResult> UploadFiles(Guid repositoryId, [FromForm] IEnumerable<IFormFile> files)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user is not null)
            {
                var res = await _repositoryService.CreateFilesByForm(user.Id, repositoryId, files);
                if(res != null)
                {
                    return Ok(res);
                }
                else
                {
                    return BadRequest("Repository not found");
                }
            }
            return BadRequest();
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteFiles(Guid repositoryId, [FromBody] IEnumerable<Guid> fileIds)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user is not null)
            {
                if(await _repositoryService.DeleteFiles(user.Id, repositoryId, fileIds))
                {
                    return Ok();
                }
            }
            return BadRequest();
        }


        [HttpPost("download")]
        public async Task DownloadFiles(Guid repositoryId, [FromBody] IEnumerable<Guid> fileIds)
        {
            UserModel? user = ClaimsHelper.RetreiveUserFromClaims(HttpContext.User);
            if (user is not null)
            {
                Response.ContentType = "application/octet-stream";

                Response.Headers.Add("Content-Disposition", $"attachment; filename={DateTime.Now}");

                var files = (await _repositoryService.GetFilesReadStreams(user.Id, repositoryId, fileIds)).ToList();
                if (files.Count > 1)
                {
                    using (var archive = new ZipArchive(Response.BodyWriter.AsStream(), ZipArchiveMode.Create))
                    {
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
                else if(files.Count == 1)
                {
                    var file = files.First();
                    try
                    {
                        using (var fileStream = await file.OpenStreamAsync(RepositoryFileStreamMode.Read))
                        {
                            await fileStream.CopyToAsync(Response.Body);
                        }
                    }
                    catch
                    {
                        _logger.LogWarning($"Error while accessing file {file.Name}");
                    }
                }
            }
        }
    }
}