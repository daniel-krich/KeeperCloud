import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { catchError, map, switchMap, of, throwIfEmpty, tap, throwError, defer, withLatestFrom } from "rxjs";
import { RepositoryDataService } from "src/app/client/data-access/repository-data.service";
import { AppStateInterface } from "../app.state";
import { loadRepoBatchError, loadRepoBatchInit, loadRepoBatchNext, loadRepoBatchSuccess } from "./repository.actions";
import { selectRepos } from "./repository.selectors";


@Injectable()
export class RepositoryEffects {

    loadRepoBatchStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRepoBatchInit, loadRepoBatchNext),
            withLatestFrom(this.store.select(selectRepos)),
            switchMap(([action, repos]) =>
                this.repoDataService.loadRepositories(repos.repositories.length).pipe(
                    map((repoBatch) => loadRepoBatchSuccess({ batch: repoBatch })),
                    catchError(x => of(loadRepoBatchError()))
                )
            )
        )
    );


    constructor(private actions$: Actions,
                private store: Store<AppStateInterface>,
                private repoDataService: RepositoryDataService) {}
    
}