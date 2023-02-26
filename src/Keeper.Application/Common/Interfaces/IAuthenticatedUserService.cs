﻿using Keeper.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Common.Interfaces;

public interface IAuthenticatedUserService
{
    AuthenticatedUserModel? User { get; }
}