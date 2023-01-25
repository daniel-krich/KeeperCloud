import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-repository-info',
  templateUrl: './repository-info.component.html',
  styleUrls: ['./repository-info.component.scss']
})
export class RepositoryInfoComponent {
    @Input() public repository!: RepoInterface;
    @Output() public repositoryEditOpen: EventEmitter<void> = new EventEmitter();
    @Output() public repositoryRemove: EventEmitter<void> = new EventEmitter();
}
