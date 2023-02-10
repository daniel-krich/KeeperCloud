using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.DataAccess.Enums
{
    [Flags]
    public enum RepositoryPermissionFlags
    {
        None = 0,
        CanRead = 1,
        CanWrite = 2,
        CanUpdate = 4,
        CanDelete = 8
    }
}