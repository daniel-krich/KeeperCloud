import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-client-sidenav-repositories',
  templateUrl: './client-sidenav-repositories.component.html',
  styleUrls: ['./client-sidenav-repositories.component.scss']
})
export class ClientSidenavRepositoriesComponent {
    @Input() public repositories: RepoInterface[] | null = null;
    @Output() public RepositoryClick: EventEmitter<RepoInterface> = new EventEmitter<RepoInterface>();

    public onRepoClick(repo: RepoInterface): void {
        this.RepositoryClick.emit(repo);
    }
}
