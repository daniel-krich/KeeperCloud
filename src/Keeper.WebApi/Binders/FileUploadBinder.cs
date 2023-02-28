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

        var files = new List<IFileUpload>();
        var formFiles = bindingContext.HttpContext.Request.Form.Files;

        foreach (var formFile in formFiles)
        {
            files.Add(new FileUpload(formFile));
        }

        bindingContext.Result = ModelBindingResult.Success(files);
        return Task.CompletedTask;
    }
}