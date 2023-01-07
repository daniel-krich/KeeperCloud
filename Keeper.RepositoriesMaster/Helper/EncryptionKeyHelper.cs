using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.RepositoriesMaster.Helper
{
    public static class EncryptionKeyHelper
    {
        public static string CombineKeyIv(byte[] key, byte[] iv)
        {
            // Concatenate the key and IV into a single byte array
            byte[] combinedKeyIv = new byte[key.Length + iv.Length];
            Buffer.BlockCopy(key, 0, combinedKeyIv, 0, key.Length);
            Buffer.BlockCopy(iv, 0, combinedKeyIv, key.Length, iv.Length);

            // Convert the combined key and IV to a base64 string
            string combinedKeyIvBase64 = Convert.ToBase64String(combinedKeyIv);

            return combinedKeyIvBase64;
        }

        public static (byte[] key, byte[] iv) SplitKeyIv(string combinedKeyIvBase64)
        {
            // Convert the base64 string back to a byte array
            byte[] combinedKeyIv = Convert.FromBase64String(combinedKeyIvBase64);

            // Split the combined key and IV into separate arrays
            int keyLength = combinedKeyIv.Length / 2;
            byte[] key = new byte[keyLength];
            byte[] iv = new byte[keyLength];
            Buffer.BlockCopy(combinedKeyIv, 0, key, 0, keyLength);
            Buffer.BlockCopy(combinedKeyIv, keyLength, iv, 0, keyLength);

            return (key, iv);
        }
    }
}
