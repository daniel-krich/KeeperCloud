import { RepositoryMemberInterface, RepositoryPermissionFlags } from "../interfaces/repository-member.interface";

export class RepositoryMemberModel implements RepositoryMemberInterface {
    id: string = '';
    name: string = '';
    role: string = '';
    combination: string = '';
    permissionFlags: RepositoryPermissionFlags = RepositoryPermissionFlags.None;

    constructor(repository?: RepositoryMemberInterface) {
        if(repository) {
            this.id = repository.id;
            this.name = repository.name;
            this.role = repository.role;
            this.combination = repository.combination;
            this.permissionFlags = repository.permissionFlags;
        }
    }
}