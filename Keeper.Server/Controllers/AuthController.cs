using Keeper.DataAccess.Entities;
using Keeper.DataAccess.Factories;
using Keeper.Server.DTOs;
using Keeper.Server.JwtSecurity;
using Keeper.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IKeeperDbContextFactory _keeperFactory;
        private readonly IJwtService _jwtService;
        public AuthController(IKeeperDbContextFactory keeperFactory, IJwtService jwtService)
        {
            _keeperFactory = keeperFactory;
            _jwtService = jwtService;
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SigninRequest([FromBody] AuthRequestDTO authReq)
        {
            var jwtAccess = await _jwtService.CreateTokenAsync(authReq);
            if (jwtAccess is not null)
            {
                return Ok(jwtAccess);
            }

            return BadRequest();
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> SignupRequest([FromBody] SignupRequestDTO signupReq)
        {
            using (var context = _keeperFactory.CreateDbContext())
            {
                if(await context.Users.FirstOrDefaultAsync(x => x.Email == signupReq.Email) == null)
                {
                    HashingUtil.HashHmac(signupReq.Password, out var hash, out var salt);
                    context.Users.Add(new UserEntity
                    {
                        Email = signupReq.Email,
                        PasswordHash = hash,
                        PasswordSalt = salt,
                        Firstname = signupReq.Firstname,
                        Lastname = signupReq.Lastname,
                        RegisterIp = HttpContext.Connection.RemoteIpAddress?.ToString(),
                        LastAccessIp = HttpContext.Connection.RemoteIpAddress?.ToString(),


                    });
                    await context.SaveChangesAsync();
                    return NoContent();
                }
                return BadRequest();
            }
        }

        [HttpGet("validate")]
        [Authorize]
        public IActionResult ValidateJwt()
        {
            return NoContent();
        }

        [HttpGet("exit")]
        [Authorize]
        public IActionResult Exit()
        {
            return NoContent();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshJwt([FromBody] TokenRefreshRequestDTO tokenRefreshRequest)
        {
            var jwtAccess = await _jwtService.CreateTokenAsync(tokenRefreshRequest.RefreshToken);
            if(jwtAccess is not null)
            {
                return Ok(jwtAccess);
            }

            return BadRequest();
        }
    }
}