using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Models;

public class MemberKeyAuthenticationOptions: AuthenticationSchemeOptions
{
    public const string DefaultScheme = "MemberKeyAuth";
    public const string HeaderName = "Authorization";
    public string Scheme => DefaultScheme;
    public string AuthenticationType = DefaultScheme;
}