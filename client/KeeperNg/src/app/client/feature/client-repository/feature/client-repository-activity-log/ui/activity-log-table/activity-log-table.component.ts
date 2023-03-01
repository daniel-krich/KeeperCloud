import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { nameof } from 'src/app/client/util/nameof.util';
import { RepositoryActivityInterface } from '../../interfaces/repository-activity.interface';

@Component({
  selector: 'app-activity-log-table',
  templateUrl: './activity-log-table.component.html',
  styleUrls: ['./activity-log-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityLogTableComponent {
    @Input() public activities?: RepositoryActivityInterface[] | null;

    displayedColumns: string[] = [
        nameof<RepositoryActivityInterface>('operationName'),
        nameof<RepositoryActivityInterface>('identity'),
        nameof<RepositoryActivityInterface>('userType'),
        nameof<RepositoryActivityInterface>('operationContext'),
        nameof<RepositoryActivityInterface>('createdDate')
    ];
}
