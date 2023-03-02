using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Repositories.Exceptions;

public class RepositoryNotFoundException: ApplicationException
{
    public RepositoryNotFoundException(): base() { }
}
