import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { nameof } from 'src/app/client/util/nameof.util';
import { RepositoryMemberInterface } from '../../interfaces/repository-member.interface';

@Component({
  selector: 'app-member-api-table',
  templateUrl: './member-api-table.component.html',
  styleUrls: ['./member-api-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberApiTableComponent {
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

}
