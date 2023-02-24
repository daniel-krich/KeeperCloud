using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Interfaces;

public interface IKeeperDbContextFactory
{
    IKeeperDbContext CreateDbContext();
}