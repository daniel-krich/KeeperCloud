using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using WebImages.WebUI.Configuration;

namespace WebImages.WebUI.Services;

public class KeeperUploadResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public long FileSize { get; set; }
    public bool IsPublic { get; set; }
    public DateTime LastModified { get; set; }
}

public class KeeperStorageInteractorService
{
    private readonly HttpClient _httpClient = new HttpClient();
    public KeeperSettings KeeperSettings { get; set; }
    public KeeperStorageInteractorService(IConfiguration configuration)
    {
        KeeperSettings = configuration.GetSection(nameof(KeeperSettings)).Get<KeeperSettings>();
        _httpClient.DefaultRequestHeaders.Add("Authorization", string.Join(" ", "MemberKeyAuth", KeeperSettings.MemberAccessKey));
    }

    public async Task<List<KeeperUploadResponse>> UploadFile(IFormFile file)
    {
        var formData = new MultipartFormDataContent();
        
        var fileContent = new StreamContent(file.OpenReadStream());
        fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
        formData.Add(fileContent, "file", file.FileName);

        var response = await _httpClient.PostAsync($"{KeeperSettings.Url}/storage/{KeeperSettings.RepositoryId}/upload", formData);

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        return await JsonSerializer.DeserializeAsync<List<KeeperUploadResponse>>(await response.Content.ReadAsStreamAsync(), options) ?? new List<KeeperUploadResponse>();
    }

    public async Task DeleteFile(Guid fileId)
    {

        string fileIdsJson = JsonSerializer.Serialize(new List<Guid> { fileId });

        HttpContent content = new StringContent(fileIdsJson, Encoding.UTF8, "application/json");

        var response = await _httpClient.PutAsync($"{KeeperSettings.Url}/storage/{KeeperSettings.RepositoryId}/remove", content);
    }
}