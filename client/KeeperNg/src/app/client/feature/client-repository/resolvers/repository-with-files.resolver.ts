import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, concatMap, EMPTY, filter, first, forkJoin, map, merge, Observable, of, skipWhile, switchMap, take, takeWhile, tap, withLatestFrom } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { loadRepoFilesBatchInit } from 'src/app/shared/data-access/state/repositories-files/repositories-files.actions';
import { selectRepoFileStateId } from 'src/app/shared/data-access/state/repositories-files/repositories-files.selectors';
import { loadRepoStart } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoById, selectRepoByIdWithStatus, selectRepoStateStatus } from 'src/app/shared/data-access/state/repository/repository.selectors';

@Injectable({
    providedIn: 'root'
})
export class RepositoryWithFilesResolver implements Resolve<boolean> {

    constructor(private store: Store<AppStateInterface>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const repositoryId: string = route.params['repositoryId'];
        return this.retrieveRepository(repositoryId).pipe(
            take(1),
            switchMap(_ => 
                this.retrieveRepositoryFilesInit(repositoryId).pipe(
                    map(_ => true)
                )
            ),
        );
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

    private retrieveRepositoryFilesInit(repositoryId: string): Observable<boolean> {
        return this.store.select(selectRepoFileStateId(repositoryId)).pipe(
            tap(repoFilesState => {
                if(!repoFilesState) {
                    this.store.dispatch(loadRepoFilesBatchInit({ repositoryId: repositoryId }));
                }
            }),
            filter((state) => !!state?.files),
            map(_ => true)
        );
    }
}