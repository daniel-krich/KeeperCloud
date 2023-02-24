namespace Keeper.Domain.Enums;

[Flags]
public enum RepositoryPermissionFlags
{
    None = 0,
    CanRead = 1,
    CanWrite = 2,
    CanUpdate = 4,
    CanDelete = 8
}
