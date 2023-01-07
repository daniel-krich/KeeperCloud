using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.RepositoriesMaster.Master
{
    public interface IRepositoriesMasterOptions
    {
        string ReposDirectory { get; set; }
        long MaxMultipleFileSize { get; set; }
        long MaxSingleFileSize { get; }
    }

    internal class RepositoriesMasterOptions : IRepositoriesMasterOptions
    {
        public string ReposDirectory { get; set; } = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "!uploads");
        public long MaxMultipleFileSize { get; set; } = 1024 * 1000 * 20; // 20MB 
        public long MaxSingleFileSize { get; } = 1024 * 1000 * 2; // 2MB
    }
}