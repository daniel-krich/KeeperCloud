using Keeper.RepositoriesAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.RepositoriesAccess.Models;

internal class RepositoriesAccessorOptions : IRepositoriesAccessorOptions
{
    public string FullDirectory => Path.Combine(RootDirectory, FolderName);
    public string RootDirectory { get; set; } = AppDomain.CurrentDomain.BaseDirectory;
    public string FolderName { get; set; } = "uploads";
    public long MaxMultipleFileSize { get; set; } = 1024 * 1000 * 20;
    public long MaxSingleFileSize { get; set; } = 1024 * 1000 * 2;
}