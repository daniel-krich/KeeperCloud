using Keeper.Application.Common.DTOs;
using Keeper.Application.Common.Interfaces;
using Keeper.Domain.Models;
using Keeper.WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Security.Claims;
using System.Text.Json;

namespace Keeper.WebApi.Controllers.Api;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IJwtService _jwtService;
    private readonly IAuthService _authService;
    private readonly ICookieService _cookieService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public AuthenticationController(IJwtService jwtService, IAuthService authService, ICookieService cookieService, IHttpContextAccessor httpContextAccessor)
    {
        _jwtService = jwtService;
        _authService = authService;
        _cookieService = cookieService;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpPost("sign-in")]
    public async Task<ActionResult<UserModel>> SigninRequest([FromBody] AuthRequestDto authReq)
    {
        var jwtAccess = await _jwtService.CreateTokenAsync(authReq);
        if (jwtAccess is not null)
        {
            _cookieService.SetCookie(_jwtService.JwtSettings.JwtRefreshCookieName, jwtAccess.RefreshToken, TimeSpan.FromDays(1), true);
            _httpContextAccessor.HttpContext?.Response.Headers.TryAdd(_jwtService.JwtSettings.JwtResponseHeaderName, new StringValues(jwtAccess.Token));
            _httpContextAccessor.HttpContext?.Response.Headers.TryAdd("Access-Control-Expose-Headers", new StringValues(_jwtService.JwtSettings.JwtResponseHeaderName));
            return Ok(jwtAccess.User);
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
        if (_httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated == true && _httpContextAccessor.HttpContext?.User is ClaimsPrincipal claims)
        {
            var user = ClaimsHelper.RetreiveUserFromClaims(claims);
            if (user != null)
                return Ok(user);

        }
        return Unauthorized();
    }

    [HttpGet("exit")]
    [Authorize]
    public IActionResult Exit()
    {
        return NoContent();
    }

    [HttpPut("refresh")]
    public async Task<ActionResult<UserModel>> RefreshJwt()
    {
        var refreshToken = _cookieService.GetCookie(_jwtService.JwtSettings.JwtRefreshCookieName);
        if (refreshToken != null)
        {
            var jwtAccess = await _jwtService.CreateTokenAsync(refreshToken);
            if (jwtAccess is not null)
            {
                _httpContextAccessor.HttpContext?.Response.Headers.TryAdd(_jwtService.JwtSettings.JwtResponseHeaderName, new StringValues(jwtAccess.Token));
                _httpContextAccessor.HttpContext?.Response.Headers.TryAdd("Access-Control-Expose-Headers", new StringValues(_jwtService.JwtSettings.JwtResponseHeaderName));
                return Ok(jwtAccess.User);
            }
        }

        return BadRequest();
    }
}