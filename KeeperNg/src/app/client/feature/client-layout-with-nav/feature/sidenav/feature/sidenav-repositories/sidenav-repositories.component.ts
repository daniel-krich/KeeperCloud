import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { loadRepoBatchNext } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoStateDesc } from 'src/app/shared/data-access/state/repository/repository.selectors';

@Component({
  selector: 'app-sidenav-repositories',
  templateUrl: './sidenav-repositories.component.html',
  styleUrls: ['./sidenav-repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavRepositoriesComponent {

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
