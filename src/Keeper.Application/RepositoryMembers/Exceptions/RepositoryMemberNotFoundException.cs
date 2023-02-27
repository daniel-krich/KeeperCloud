using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryMembers.Exceptions;

public class RepositoryMemberNotFoundException : ApplicationException
{
    public RepositoryMemberNotFoundException() : base() { }
}