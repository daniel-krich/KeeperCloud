using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Common.Models;

public class RepositoryFileWithStream : IDisposable
{
    public FileModel File { get; set; }
    public Stream Stream { get; set; }

    public RepositoryFileWithStream(FileModel file, Stream stream)
    {
        File = file;
        Stream = stream;
    }

    public void Dispose()
    {
        this.Stream?.Dispose();
    }
}