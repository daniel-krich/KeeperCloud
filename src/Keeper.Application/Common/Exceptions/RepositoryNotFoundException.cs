using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Common.Exceptions;

public class RepositoryNotFoundException : ApplicationException
{
    public RepositoryNotFoundException() : base() { }
}
