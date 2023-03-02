using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebImages.WebUI.Services;

namespace WebImages.WebUI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PhotoController : ControllerBase
{
    private readonly ImagesUrlsPersistenceService _imagesUrlsPersistenceService;
    private readonly KeeperStorageInteractorService _keeperStorageInteractorService;
    public PhotoController(ImagesUrlsPersistenceService imagesUrlsPersistenceService, KeeperStorageInteractorService keeperStorageInteractorService)
    {
        _imagesUrlsPersistenceService = imagesUrlsPersistenceService;
        _keeperStorageInteractorService = keeperStorageInteractorService;
    }

    [HttpPost]
    public async Task<IActionResult> UploadPhoto([FromForm] IFormFile file)
    {
        var files = await _keeperStorageInteractorService.UploadFile(file);
        if (files.Any())
        {
            await _imagesUrlsPersistenceService.AddFileId(files.First().Id);
            return Ok(new
            {
                Url = $"{_keeperStorageInteractorService.KeeperSettings.Url}/storage/{_keeperStorageInteractorService.KeeperSettings.RepositoryId}/{files.First().Id}",
                FileId = files.First().Id
            });
        }
        return NotFound();
    }

    [HttpDelete("{fileId:guid}")]
    public async Task<IActionResult> DeletePhoto([FromRoute] Guid fileId)
    {
        await _keeperStorageInteractorService.DeleteFile(fileId);
        await _imagesUrlsPersistenceService.RemoveFileId(fileId);
        return NoContent();
    }
}