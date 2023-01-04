namespace Keeper.Server.Models
{
    public class UserModel
    {
        public Guid Id { get; set; }
        public string? Email { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
    }
}
