using Microsoft.AspNetCore.StaticFiles;

namespace Keeper.Server.Helpers
{
    public static class MimeHelper
    {
        public static string GetMimeType(string filePath)
        {
            const string DefaultContentType = "application/octet-stream";

            var provider = new FileExtensionContentTypeProvider();

            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = DefaultContentType;
            }

            return contentType;
        }
    }
}
