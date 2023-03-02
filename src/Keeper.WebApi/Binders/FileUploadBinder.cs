using Keeper.Application.Common.Interfaces;
using Keeper.Infrastructure.Common;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Keeper.WebApi.Binders;

public class FileUploadBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        if (bindingContext == null)
        {
            throw new ArgumentNullException(nameof(bindingContext));
        }

        if (bindingContext.ModelType == typeof(IFileUpload))
        {
            var formFile = bindingContext.HttpContext.Request.Form.Files.FirstOrDefault();
            bindingContext.Result = ModelBindingResult.Success(formFile);
        }
        else
        {
            var files = new List<IFileUpload>();
            var formFiles = bindingContext.HttpContext.Request.Form.Files;

            foreach (var formFile in formFiles)
            {
                files.Add(new FileUpload(formFile));
            }

            bindingContext.Result = ModelBindingResult.Success(files);
        }
        return Task.CompletedTask;

    }
}

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

        if (context.Metadata.ModelType == typeof(IEnumerable<IFileUpload>) || context.Metadata.ModelType == typeof(IFileUpload))
        {
            return _fileUploadBinder;
        }

        return null;
    }
}