using Keeper.Application.DTOs;
using Keeper.Application.Interfaces;
using Keeper.Application.Security.Jwt.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keeper.WebApi.Controllers.Api;

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
    public async Task<IActionResult> SigninRequest([FromBody] AuthRequestDto authReq)
    {
        var jwtAccess = await _jwtService.CreateTokenAsync(authReq);
        if (jwtAccess is not null)
        {
            return Ok(jwtAccess);
        }

        return BadRequest();
    }

    [HttpPost("sign-up")]
    public async Task<IActionResult> SignupRequest([FromBody] SignupRequestDto signupReq)
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
    public async Task<IActionResult> RefreshJwt([FromBody] TokenRefreshRequestDto tokenRefreshRequest)
    {
        var jwtAccess = await _jwtService.CreateTokenAsync(tokenRefreshRequest.RefreshToken);
        if(jwtAccess is not null)
        {
            return Ok(jwtAccess);
        }

        return BadRequest();
    }
}