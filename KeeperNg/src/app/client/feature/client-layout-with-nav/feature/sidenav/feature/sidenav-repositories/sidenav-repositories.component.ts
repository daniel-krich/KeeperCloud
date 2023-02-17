import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { loadRepoBatchError, loadRepoBatchNext, loadRepoBatchSuccess } from 'src/app/shared/data-access/state/repository/repository.actions';
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
                private actions: Actions,
                public router: Router) { }
    

    public loadMoreRepositories(): Observable<any> {
        this.store.dispatch(loadRepoBatchNext());

        return this.actions.pipe(
            ofType(loadRepoBatchSuccess, loadRepoBatchError),
            first()
        );
    }
}
