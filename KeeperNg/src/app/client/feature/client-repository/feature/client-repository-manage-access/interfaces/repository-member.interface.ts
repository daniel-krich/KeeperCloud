export enum RepositoryPermissionFlags {
    None = 0,
    CanRead = 1,
    CanWrite = 2,
    CanUpdate = 4,
    CanDelete = 8
}

export interface RepositoryMemberInterface {
    id: string;
    name: string;
    role: string;
    combination: string;
    permissionFlags: RepositoryPermissionFlags;
}