using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Common.Security;

public class UserCredentials
{
    public Guid Id { get; set; }
    public UserCredentialsType UserType { get; set; }
    public string? IdentityName { get; set; }
}