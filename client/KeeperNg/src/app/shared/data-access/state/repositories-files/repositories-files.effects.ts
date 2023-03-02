import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { catchError, map, switchMap, of, throwIfEmpty, tap, throwError, defer, withLatestFrom, EMPTY } from "rxjs";
import { RepositoryApiService } from "src/app/client/data-access/repository-api.service";
import { RepositoryFilesApiService } from "src/app/client/data-access/repository-files-api.service";
import { AppStateInterface } from "../app.state";
import { decreaseRepositoryFilesStats } from "../repository/repository.actions";
import { deleteRepoFilesBegin, deleteRepoFilesDone, loadRepoFilesBatchError, loadRepoFilesBatchInit, loadRepoFilesBatchNext, loadRepoFilesBatchSuccess, loadRepoFilesBatchSuccessEmpty } from "./repositories-files.actions";
import { selectReposKeyFile } from "./repositories-files.selectors";


@Injectable()
export class RepositoryFilesEffects {

    loadRepoFilesBatchInit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoFilesBatchInit),
            withLatestFrom(this.store.select(selectReposKeyFile)),
            switchMap(([action, repoFiles]) => {
                if (repoFiles[action.repositoryId].files == null && repoFiles[action.repositoryId].stateStatus == 'loading') {
                    return this.repoFilesDataService.loadRepositoryFiles(action.repositoryId).pipe(
                        map(filesBatch => loadRepoFilesBatchSuccess({ repositoryFilesBatch: filesBatch, repositoryId: action.repositoryId })),
                        catchError((error: Error) => of(loadRepoFilesBatchError({ repositoryId: action.repositoryId, error: error.message })))
                    )
                }
                return of(loadRepoFilesBatchSuccessEmpty({ repositoryId: action.repositoryId }));
            })
        )
    );

    loadRepoFilesBatchNext$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoFilesBatchNext),
            withLatestFrom(this.store.select(selectReposKeyFile)),
            switchMap(([action, repoFiles]) =>
                this.repoFilesDataService.loadRepositoryFiles(action.repositoryId, repoFiles[action.repositoryId].files?.length, action.take).pipe(
                    map(filesBatch => loadRepoFilesBatchSuccess({ repositoryFilesBatch: filesBatch, repositoryId: action.repositoryId })),
                    catchError((error: Error) => of(loadRepoFilesBatchError({ repositoryId: action.repositoryId, error: error.message })))
                )
            )
        )
    );

    deleteRepoFilesBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRepoFilesBegin),
            switchMap((action) => {
                return this.repoFilesDataService.deleteRepositoryFiles(action.repositoryId, action.files).pipe(
                    map(_ => deleteRepoFilesDone({ repositoryId: action.repositoryId, files: action.files })),
                    catchError(() => EMPTY)
                )
            })
        )
    );

    deleteRepoFilesDone$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRepoFilesDone),
            switchMap(action => of(
                decreaseRepositoryFilesStats({ repositoryId: action.repositoryId, files: action.files }),
                loadRepoFilesBatchNext({ repositoryId: action.repositoryId, take: action.files.length })
            ))
        )
    );


    constructor(private actions$: Actions,
        private store: Store<AppStateInterface>,
        private repoDataService: RepositoryApiService,
        private repoFilesDataService: RepositoryFilesApiService) { }

}