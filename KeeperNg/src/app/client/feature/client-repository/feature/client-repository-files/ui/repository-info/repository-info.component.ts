import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-repository-info',
  templateUrl: './repository-info.component.html',
  styleUrls: ['./repository-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryInfoComponent {
    @Input() public repository!: RepoInterface;
    @Output() public repositoryEditOpen: EventEmitter<void> = new EventEmitter();
    @Output() public repositoryRemove: EventEmitter<void> = new EventEmitter();
}