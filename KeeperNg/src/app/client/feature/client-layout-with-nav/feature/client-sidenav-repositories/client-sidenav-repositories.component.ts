import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { loadRepoBatchNext } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoStateDesc } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-client-sidenav-repositories',
  templateUrl: './client-sidenav-repositories.component.html',
  styleUrls: ['./client-sidenav-repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSidenavRepositoriesComponent {

    public repositoriesState$ = this.store.select(selectRepoStateDesc);

    public repoBatchInfo$ = this.repositoriesState$.pipe(
        map(x => ({ canLoadMore: !x?.disableAdditionalBatchLoading, HowMuchLeft: x?.batchRemainder}))
    );

    constructor(private store: Store<AppStateInterface>,
                public router: Router) { }
    

    public loadMoreRepositories(): void {
        this.store.dispatch(loadRepoBatchNext());
    }
}
