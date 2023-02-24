using System.Security.Cryptography;
using System.Text;

namespace Keeper.Utilities;

public static class Hashing
{
    public static string Random1024BitToken()
    {
        byte[] randomBytes = new byte[128];
        RandomNumberGenerator.Fill(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }

    public static void HashHmac(string plain_text, out byte[] hash, out byte[] salt)
    {
        salt = new byte[128];
        RandomNumberGenerator.Fill(salt);
        using var hmac = new HMACSHA512(salt);
        hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(plain_text));
    }

    public static bool IsHashHmacMatch(string plain_text, byte[] hash, byte[] salt)
    {
        using var hmac = new HMACSHA512(salt);
        return hmac.ComputeHash(Encoding.UTF8.GetBytes(plain_text)).SequenceEqual(hash);
    }
}
