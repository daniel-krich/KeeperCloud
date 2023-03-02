using System.Text;
using System.Text.Json;

namespace WebImages.WebUI.Services;

public class ImagesUrlsPersistenceService
{
    private readonly string _imagesJsonPath;

    public ImagesUrlsPersistenceService()
    {
        _imagesJsonPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "imagesIds.json");

        if (!File.Exists(_imagesJsonPath))
        {
            File.WriteAllText(_imagesJsonPath, "[]");
        }
    }

    public async Task AddFileId(Guid fileId)
    {
        var images = (await GetAllImagesIds()).Append(fileId);

        using var dbStream = new FileStream(_imagesJsonPath, FileMode.Create, FileAccess.Write, FileShare.Read);

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        await JsonSerializer.SerializeAsync(dbStream, images, options);
    }

    public async Task RemoveFileId(Guid fileId)
    {
        var images = await GetAllImagesIds();

        images.Remove(fileId);

        using var dbStream = new FileStream(_imagesJsonPath, FileMode.Create, FileAccess.Write, FileShare.Read);

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        await JsonSerializer.SerializeAsync(dbStream, images, options);
    }

    public async Task<List<Guid>> GetAllImagesIds()
    {
        using var dbStream = new FileStream(_imagesJsonPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        var images = await JsonSerializer.DeserializeAsync<List<Guid>>(dbStream, options);
        return images ?? new List<Guid>();
    }

}