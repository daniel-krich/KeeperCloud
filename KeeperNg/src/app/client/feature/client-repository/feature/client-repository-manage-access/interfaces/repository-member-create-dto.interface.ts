import { RepositoryPermissionFlags } from "./repository-member.interface";

export interface RepositoryMemberCreateDtoInterface {
    name: string;
    role: string;
    permissionFlags: RepositoryPermissionFlags;
}