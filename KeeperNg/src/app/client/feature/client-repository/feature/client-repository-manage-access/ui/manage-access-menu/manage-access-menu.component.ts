import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-manage-access-menu',
  templateUrl: './manage-access-menu.component.html',
  styleUrls: ['./manage-access-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageAccessMenuComponent {
    @Input() public apiMembersCount: number = 0;
    @Input() public repository!: RepoInterface;
    @Output() public clickAddApiMember: EventEmitter<void> = new EventEmitter<void>();
    @Output() public toggleAllowAnonymousFileRead: EventEmitter<boolean> = new EventEmitter<boolean>();
}