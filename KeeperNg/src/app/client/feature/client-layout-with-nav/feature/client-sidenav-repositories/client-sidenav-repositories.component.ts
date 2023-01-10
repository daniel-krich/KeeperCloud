import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { selectRepoStateDesc } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-client-sidenav-repositories',
  templateUrl: './client-sidenav-repositories.component.html',
  styleUrls: ['./client-sidenav-repositories.component.scss']
})
export class ClientSidenavRepositoriesComponent {

    public repositoriesState$ = this.store.select(selectRepoStateDesc);

    constructor(private store: Store<AppStateInterface>,
                public router: Router) { }
                
}
