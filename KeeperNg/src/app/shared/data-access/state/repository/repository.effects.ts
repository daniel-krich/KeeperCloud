import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { catchError, map, switchMap, of, throwIfEmpty, tap, throwError, defer, withLatestFrom, delay } from "rxjs";
import { RepositoryDataService } from "src/app/client/data-access/repository-data.service";
import { RepositoryFilesDataService } from "src/app/client/data-access/repository-files-data.service";
import { AppStateInterface } from "../app.state";
import { loadRepoFilesBatchInit, removeAllRepoFilesByRepoId } from "../repositories-files/repositories-files.actions";
import { 
    createRepositoryBegin,
    createRepositoryError,
    createRepositorySuccess,
    deleteRepositoryBegin,
    deleteRepositoryError,
    deleteRepositorySuccess,
    loadRepoBatchError,
    loadRepoBatchInit,
    loadRepoBatchNext,
    loadRepoBatchSuccess,
    loadRepoError,
    loadRepoStart,
    loadRepoSuccess,
    loadRepoSuccessEmpty,
    updateRepositoryBegin,
    updateRepositoryError,
    updateRepositorySuccess
} from "./repository.actions";
import { selectRepos } from "./repository.selectors";


@Injectable()
export class RepositoryEffects {

    loadRepoBatchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoBatchInit, loadRepoBatchNext),
            withLatestFrom(this.store.select(selectRepos)),
            switchMap(([_, repos]) =>
                this.repoDataService.loadRepositories(repos.repositories.length - repos.loadedIndividuallyCount).pipe(
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

    /*loadRepoFinished$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoSuccess, loadRepoSuccessEmpty),
            switchMap((action) => of(loadRepoFilesBatchInit({ repositoryId: action.repositoryId })))
        )
    );*/

    loadRepoFailed$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoError),
            tap(_ => {
                console.log(`Failed to load the requested repository (Navigating away...)`);
                this.router.navigate(['/client']);
            })
        )
    , { dispatch: false });

    deleteRepositoryBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRepositoryBegin),
            switchMap(action =>
                this.repoDataService.deleteRepository(action.repository.id).pipe(
                    map(_ => deleteRepositorySuccess({ repositoryId: action.repository.id })),
                    catchError(() => of(deleteRepositoryError()))
                )
            )
        )
    );

    deleteRepositorySuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRepositorySuccess),
            map(action => removeAllRepoFilesByRepoId({ repositoryId: action.repositoryId })),
            tap(_ => {
                this.router.navigate(['/client']);
                this.snackbar.open("Repository was successfully deleted.", 'Close', {
                    duration: 2000,
                    panelClass: ['success-snackbar']
                });
            })
        )
    );

    deleteRepositoryError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRepositoryError),
            tap(_ => {
                this.snackbar.open("Repository deletion resulted in failure.", 'Close', {
                    duration: 2000,
                    panelClass: ['error-snackbar']
                });
            })
        )
    , { dispatch: false });

    updateRepositoryBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateRepositoryBegin),
            switchMap((action) =>
                this.repoDataService.updateRepository(action.repositoryId, action.repositoryUpdate).pipe(
                    map(_ => updateRepositorySuccess({ repositoryId: action.repositoryId, repositoryUpdate: action.repositoryUpdate })),
                    catchError(() => of(updateRepositoryError()))
                )
            )
        )
    );

    updateRepositorySuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateRepositorySuccess),
            tap(_ => {
                this.snackbar.open("Repository was successfully updated.", 'Close', {
                    duration: 2000,
                    panelClass: ['success-snackbar']
                });
            })
        )
    , { dispatch: false });

    createRepositoryBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createRepositoryBegin),
            switchMap((action) => 
                this.repoDataService.createRepository(action.repository).pipe(
                    map(repoInterface => createRepositorySuccess({ repository: repoInterface })),
                    catchError(() => of(createRepositoryError()))
                )
            )
        )
    );

    createRepositorySuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createRepositorySuccess),
            tap(_ => {
                this.snackbar.open("Repository creation was successful.", 'Close', {
                    duration: 2000,
                    panelClass: ['success-snackbar']
                });
            })
        )
    , { dispatch: false });

    createRepositoryError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createRepositoryError),
            tap(_ => {
                this.snackbar.open("Repository creation resulted in failure.", 'Close', {
                    duration: 2000,
                    panelClass: ['error-snackbar']
                });
            })
        )
    , { dispatch: false });


    constructor(private actions$: Actions,
                private store: Store<AppStateInterface>,
                private repoDataService: RepositoryDataService,
                private router: Router,
                private snackbar: MatSnackBar,
                private repoFilesDataService: RepositoryFilesDataService) {}
    
}