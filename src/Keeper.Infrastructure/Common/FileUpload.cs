using Keeper.Application.Common.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Infrastructure.Common;

public class FileUpload : IFileUpload
{
    private readonly IFormFile _file;
    public FileUpload(IFormFile file)
    {
        _file = file;
    }
    public string ContentType => _file.ContentType;

    public string ContentDisposition => _file.ContentDisposition;

    public long Length => _file.Length;

    public string Name => _file.Name;

    public string FileName => _file.FileName;

    public void CopyTo(Stream target)
    {
        _file.CopyTo(target);
    }

    public Task CopyToAsync(Stream target, CancellationToken cancellationToken = default)
    {
        return _file.CopyToAsync(target, cancellationToken);
    }

    public Stream OpenReadStream()
    {
        return _file.OpenReadStream();
    }
}