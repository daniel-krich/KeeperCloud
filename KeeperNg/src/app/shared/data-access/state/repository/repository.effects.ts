import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { catchError, map, switchMap, of, throwIfEmpty, tap, throwError, defer, withLatestFrom } from "rxjs";
import { RepositoryDataService } from "src/app/client/data-access/repository-data.service";
import { RepositoryFilesDataService } from "src/app/client/data-access/repository-files-data.service";
import { AppStateInterface } from "../app.state";
import { loadRepoFilesBatchInit } from "../repositories-files/repositories-files.actions";
import { 
    loadRepoBatchError,
    loadRepoBatchInit,
    loadRepoBatchNext,
    loadRepoBatchSuccess,
    loadRepoError,
    loadRepoStart,
    loadRepoSuccess,
    loadRepoSuccessEmpty
} from "./repository.actions";
import { selectRepos } from "./repository.selectors";


@Injectable()
export class RepositoryEffects {

    loadRepoBatchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoBatchInit, loadRepoBatchNext),
            withLatestFrom(this.store.select(selectRepos)),
            switchMap(([_, repos]) =>
                this.repoDataService.loadRepositories(repos.repositories.length).pipe(
                    map((repoBatch) => loadRepoBatchSuccess({ batch: repoBatch })),
                    catchError((err: Error) => of(loadRepoBatchError({error: err.message})))
                )
            )
        )
    );

    loadRepoStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoStart),
            withLatestFrom(this.store.select(selectRepos)),
            switchMap(([action, repos]) => {
                if(repos.repositories.some(x => x.id == action.repositoryId)) return of(loadRepoSuccessEmpty({ repositoryId: action.repositoryId }));
                return this.repoDataService.loadRepository(action.repositoryId).pipe(
                    map(repo => loadRepoSuccess({ repositoryId: action.repositoryId, repository: repo})),
                    catchError((err: Error) => of(loadRepoError({ error: err.message })))
                );
            })
        )
    );

    loadRepoFinished$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoSuccess, loadRepoSuccessEmpty),
            switchMap((action) => of(loadRepoFilesBatchInit({ repositoryId: action.repositoryId })))
        )
    );

    loadRepoFailed$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoError),
            tap(_ => {
                console.log(`Failed to load the requested repository (Navigating away...)`);
                this.router.navigate(['/client']);
            })
        )
    , { dispatch: false });


    constructor(private actions$: Actions,
                private store: Store<AppStateInterface>,
                private repoDataService: RepositoryDataService,
                private router: Router,
                private repoFilesDataService: RepositoryFilesDataService) {}
    
}