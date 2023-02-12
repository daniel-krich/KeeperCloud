import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-api-header',
  templateUrl: './member-api-header.component.html',
  styleUrls: ['./member-api-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberApiHeaderComponent {
    @Input() public usersCount: number = 0;
}
