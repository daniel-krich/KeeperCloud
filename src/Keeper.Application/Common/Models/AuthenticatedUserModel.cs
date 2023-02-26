using Keeper.Application.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Common.Models;

public class AuthenticatedUserModel
{
    public Guid EntityId { get; set; }
    public string IdentityName { get; set; }
    public AuthenticationType AuthenticationType { get; set; }

    public AuthenticatedUserModel(Guid entityId, string identityName, AuthenticationType authenticationType)
    {
        EntityId = entityId;
        IdentityName = identityName;
        AuthenticationType = authenticationType;
    }
}