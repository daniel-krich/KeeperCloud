using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Exceptions;

public class RepositoryFileNotFoundException : ApplicationException
{
    public RepositoryFileNotFoundException() : base() { }
}
