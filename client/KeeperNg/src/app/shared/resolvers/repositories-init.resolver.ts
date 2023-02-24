import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, filter, first, map, Observable, of, tap } from 'rxjs';
import { AppStateInterface } from '../data-access/state/app.state';
import { loadRepoBatchInit } from '../data-access/state/repository/repository.actions';
import { selectRepoStateDesc } from '../data-access/state/repository/repository.selectors';

@Injectable({
    providedIn: 'root'
})
export class RepositoriesInitResolver implements Resolve<boolean> {

    constructor(private store: Store<AppStateInterface>) { }

    resolve(): Observable<boolean> {
        return this.store.select(selectRepoStateDesc).pipe(
            tap(repoState => {
                if(repoState.stateStatus === 'pending') {
                    this.store.dispatch(loadRepoBatchInit());
                }
            }),
            filter(x => x.stateStatus !== 'pending' && x.stateStatus !== 'loading'),
            map(x => x.stateStatus === 'success'),
            first()
        );
    }

}