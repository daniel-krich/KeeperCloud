using Keeper.DataAccess.Enums;
using Keeper.RepositoriesMaster.Enums;
using Keeper.RepositoriesMaster.Master;
using Keeper.Server.Helpers;
using Keeper.Server.MemberKeyAuth;
using Keeper.Server.Models;
using Keeper.Server.Services;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.Server.Controllers.Storage
{
    [Route("[controller]/{repositoryId:guid}")]
    [ApiController]
    public class StorageController : ControllerBase
    {
        private readonly IRepositoriesMaster _repoMaster;
        private readonly IRepositoryService _repositoryService;
        private readonly IMapper _mapper;
        private readonly ILogger<StorageController> _logger;

        public StorageController(IRepositoriesMaster repoMaster, IRepositoryService repositoryService, IMapper mapper, ILogger<StorageController> logger)
        {
            _repoMaster = repoMaster;
            _repositoryService = repositoryService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("{fileId:guid}")]
        [Authorize(AuthenticationSchemes = MemberKeyAuthenticationOptions.DefaultScheme)]
        [AllowAnonymous]
        public async Task<IActionResult> DownloadFileById([FromRoute] Guid repositoryId, [FromRoute] Guid fileId)
        {
            var member = ClaimsHelper.RetreiveFullMemberFromClaims(HttpContext.User);

            var repository = await _repositoryService.GetRepository(repositoryId);
            if (repository != null)
            {
                if ((member != null && member.RepositoryId == repositoryId && member.PermissionFlags.HasFlag(RepositoryPermissionFlags.CanRead)) || repository.AllowAnonymousFileRead)
                {
                    var file = (await _repositoryService.GetFilesReadStreams(repository.OwnerId, repositoryId, new List<Guid> { fileId })).FirstOrDefault();

                    if (file != null)
                    {
                        try
                        {
                            Response.ContentType = MimeHelper.GetMimeType(file.Name);
                            Response.Headers.Add("Content-Disposition", $"attachment; filename={file.Name}");

                            using (var fileStream = await file.OpenStreamAsync(RepositoryFileStreamMode.Read))
                            {
                                await fileStream.CopyToAsync(Response.Body);
                            }

                            return new EmptyResult();
                        }
                        catch
                        {
                            _logger.LogWarning($"Error while accessing file {file.Name}");
                        }
                    }
                    else
                    {
                        return NotFound("File not found");
                    }
                }
                else
                {
                    return Unauthorized();
                }
            }
            return NotFound("Repository not found");
        }
    }
}