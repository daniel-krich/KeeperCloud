using Keeper.Application.Common.Interfaces;

namespace Keeper.WebApi.Services;

public class CookieService : ICookieService
{
    private readonly IHttpContextAccessor _contextAccessor;
    public CookieService(IHttpContextAccessor contextAccessor)
    {
        _contextAccessor = contextAccessor;
    }

    public string? GetCookie(string cookieName)
    {
        if(_contextAccessor.HttpContext?.Request.Cookies.TryGetValue(cookieName, out var cookie) == true)
        {
            return cookie;
        }
        return default;
    }

    public void SetCookie(string cookieName, string value, TimeSpan expireTime, bool secure = false)
    {
        CookieOptions option = new CookieOptions();
        option.HttpOnly = true;
        option.SameSite = SameSiteMode.None;
        option.Secure = secure;
        option.Expires = DateTime.Now.Add(expireTime);
        _contextAccessor.HttpContext?.Response.Cookies.Append(cookieName, value, option);
    }

    public void RemoveCookie(string cookieName)
    {
        _contextAccessor.HttpContext?.Response.Cookies.Delete(cookieName);
    }

}