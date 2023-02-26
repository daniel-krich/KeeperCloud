using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Common.Security
{
    public class AuthorizeAttribute : Attribute
    {
        public string? Policy { get; set; }
        public string? Roles { get; set; }

        public string? AuthenticationSchemes { get; set; }
    }
}