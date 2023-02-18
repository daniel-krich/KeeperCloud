using Keeper.DataAccess.Entities;
using Keeper.DataAccess.Factories;
using Keeper.Server.DTOs;
using Keeper.Server.JwtAuth;
using Keeper.Server.Services;
using Keeper.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Keeper.Server.Controllers.WebApi
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IJwtService _jwtService;
        private readonly IAuthService _authService;
        public AuthenticationController(IJwtService jwtService, IAuthService authService)
        {
            _jwtService = jwtService;
            _authService = authService;
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
            if (await _authService.CreateAccount(signupReq, HttpContext.Connection.RemoteIpAddress?.ToString()))
            {
                return NoContent();
            }
            else return BadRequest();
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