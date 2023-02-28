using Keeper.Application.Common.Interfaces;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Keeper.WebApi.Binders;

public class FileUploadBinderProvider : IModelBinderProvider
{
    private readonly FileUploadBinder _fileUploadBinder;

    public FileUploadBinderProvider(FileUploadBinder fileUploadBinder)
    {
        _fileUploadBinder = fileUploadBinder;
    }

    public IModelBinder? GetBinder(ModelBinderProviderContext context)
    {
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        if (context.Metadata.ModelType == typeof(IEnumerable<IFileUpload>))
        {
            return _fileUploadBinder;
        }

        return null;
    }
}