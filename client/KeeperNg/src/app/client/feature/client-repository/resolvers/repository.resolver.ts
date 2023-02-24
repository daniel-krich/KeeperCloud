import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { loadRepoStart } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoByIdWithStatus } from 'src/app/shared/data-access/state/repository/repository.selectors';

@Injectable({
    providedIn: 'root'
})
export class RepositoryResolver implements Resolve<boolean> {

    constructor(private store: Store<AppStateInterface>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const repositoryId: string = route.params['repositoryId'];
        return this.retrieveRepository(repositoryId);
    }

    private retrieveRepository(repositoryId: string): Observable<boolean> {
        return this.store.select(selectRepoByIdWithStatus(repositoryId)).pipe(
            tap((repository) => {
                if(!repository.repository && repository.status === 'success') {
                    this.store.dispatch(loadRepoStart({ repositoryId: repositoryId }));
                }
            }),
            filter((repository) => !!repository.repository && repository.status !== 'loading' && repository.status !== 'pending'),
            map(_ => true)
        );
    }
}