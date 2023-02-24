using Keeper.Application.Interfaces;
using Keeper.Application.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;

namespace Keeper.Infrastructure.Handlers;

public class MemberKeyAuthenticationHandler : AuthenticationHandler<MemberKeyAuthenticationOptions>
{
    private readonly IKeeperDbContextFactory _keeperContextFactory;
    private readonly IMapper _mapper;
    public MemberKeyAuthenticationHandler(
        IKeeperDbContextFactory keeperContextFactory,
        IMapper mapper,
    //
    IOptionsMonitor<MemberKeyAuthenticationOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock
    ) : base(options, logger, encoder, clock)
    {
        _keeperContextFactory = keeperContextFactory;
        _mapper = mapper;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (Request.Headers.TryGetValue(MemberKeyAuthenticationOptions.HeaderName, out var values))
        {
            if (values.FirstOrDefault() is string header)
            {
                var headerPrefix = MemberKeyAuthenticationOptions.DefaultScheme + " ";
                if (header.StartsWith(headerPrefix))
                {
                    try
                    {
                        string base64Key = header.Substring(headerPrefix.Length);
                        string[] sections = Encoding.UTF8.GetString(Convert.FromBase64String(base64Key)).Split('.', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

                        if (sections.Length == 3)
                        {
                            using (var context = _keeperContextFactory.CreateDbContext())
                            {
                                var repositoryMemberLookup = await context.RepositoryApiMembers.Where(x => x.Id.ToString() == sections[0] && x.RepositoryId.ToString() == sections[1] && x.Key == sections[2]).FirstOrDefaultAsync();
                                if (repositoryMemberLookup is RepositoryApiMemberEntity repositoryMember)
                                {
                                    var memberModel = _mapper.Map<RepositoryApiMemberFullModel>(repositoryMember);
                                    var identity = new ClaimsIdentity(Options.AuthenticationType);
                                    identity.AddClaim(new Claim("member", JsonConvert.SerializeObject(memberModel)));
                                    var principal = new ClaimsPrincipal(identity);
                                    var ticket = new AuthenticationTicket(principal, Options.Scheme);
                                    return AuthenticateResult.Success(ticket);
                                }
                                else
                                {
                                    return AuthenticateResult.Fail("Failed finding member");
                                }
                            }
                        }
                        else
                        {
                            return AuthenticateResult.Fail("Invalid key format");
                        }
                    }
                    catch
                    {
                        return AuthenticateResult.Fail("Failed during authentication attempt");
                    }
                }
            }
        }
        return AuthenticateResult.Fail("Missing Key");
    }
}