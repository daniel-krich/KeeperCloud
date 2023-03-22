namespace Keeper.Application.Common.Interfaces;

public interface ICookieService
{
    public string? GetCookie(string cookieName);
    public void SetCookie(string cookieName, string value, TimeSpan expireTime, bool secure = false);
    public void RemoveCookie(string cookieName);
}
