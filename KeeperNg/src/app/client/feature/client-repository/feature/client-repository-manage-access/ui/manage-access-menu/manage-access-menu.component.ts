import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-manage-access-menu',
  templateUrl: './manage-access-menu.component.html',
  styleUrls: ['./manage-access-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageAccessMenuComponent {
    @Input() public apiMembersCount: number = 0;
    @Output() public clickAddApiMember: EventEmitter<void> = new EventEmitter<void>();
}
