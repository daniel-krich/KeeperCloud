import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { nameof } from 'src/app/client/util/nameof.util';
import { RepositoryMemberInterface, RepositoryPermissionFlags } from '../../interfaces/repository-member.interface';

type permissionWithName = {
    action: string,
    flag: RepositoryPermissionFlags
};

@Component({
  selector: 'app-member-api-table',
  templateUrl: './member-api-table.component.html',
  styleUrls: ['./member-api-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberApiTableComponent {

    public stringPermissions: permissionWithName[] = [
        { action: 'Read', flag: RepositoryPermissionFlags.CanRead },
        { action: 'Write', flag: RepositoryPermissionFlags.CanWrite },
        { action: 'Update', flag: RepositoryPermissionFlags.CanUpdate },
        { action: 'Delete', flag: RepositoryPermissionFlags.CanDelete },
    ];

    @Input() public repositoryMembers?: RepositoryMemberInterface[] | null;

    @Output() public clickEditMember: EventEmitter<string> = new EventEmitter<string>();

    @Output() public clickCopyApiToken: EventEmitter<string> = new EventEmitter<string>();

    @Output() public clickRemoveMember: EventEmitter<string> = new EventEmitter<string>();

    displayedColumns: string[] = [
        nameof<RepositoryMemberInterface>('name'),
        nameof<RepositoryMemberInterface>('role'),
        nameof<RepositoryMemberInterface>('permissionFlags'),
        'actions'
    ];


    public permissionsAvailable(permissions: RepositoryPermissionFlags): string[] {
        const permissionStringArray = this.stringPermissions.reduce((acc, curr) => !!(permissions & curr.flag) ? [...acc, curr.action] : acc ,[] as string[]);
        return permissionStringArray.length > 0 ? permissionStringArray : ['None'];
    }

}