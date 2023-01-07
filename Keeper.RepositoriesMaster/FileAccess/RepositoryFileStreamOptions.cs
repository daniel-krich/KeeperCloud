using Keeper.RepositoriesMaster.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.RepositoriesMaster.FileAccess
{
    public interface IRepositoryFileStreamOptions
    {
        /// <summary>
        /// File stream mode (Write/Read)
        /// </summary>
        RepositoryFileStreamMode Mode { get; set; }

        /// <summary>
        /// Set to true if you wish to use encryption.
        /// </summary>
        bool Encryption { get; set; }

        /// <summary>
        /// Set the key for the encryption.
        /// </summary>
        byte[]? Key { get; set; }

        /// <summary>
        /// Set the IV for the encryption.
        /// </summary>
        byte[]? IV { get; set; }

        /// <summary>
        /// Set to true if you wish to compress the data on disk.
        /// </summary>
        bool Compression { get; set; }
    }

    internal class RepositoryFileStreamOptions : IRepositoryFileStreamOptions
    {
        public RepositoryFileStreamMode Mode { get; set; }
        public bool Encryption { get; set; }
        public byte[]? Key { get; set; }
        public byte[]? IV { get; set; }
        public bool Compression { get; set; }
    }
}
