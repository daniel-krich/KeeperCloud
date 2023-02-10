import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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

    displayedColumns: string[] = [nameof<RepositoryMemberInterface>('name'), nameof<RepositoryMemberInterface>('role'), nameof<RepositoryMemberInterface>('permissionFlags')];

}
