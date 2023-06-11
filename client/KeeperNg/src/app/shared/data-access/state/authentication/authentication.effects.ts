import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, switchMap, of, throwIfEmpty, tap, throwError, defer } from "rxjs";
import { AuthService } from "../../auth.service";
import { signinBegin, signinError, signinSuccess, signoutBegin, signoutFinished, updateNamesBegin, updateNamesError, updateNamesFinish } from "./authentication.actions";
import { SettingsApiService } from "src/app/client/feature/client-settings/data-access/settings-api.service";


@Injectable()
export class AuthenticationEffects implements OnInitEffects {

    signinBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signinBegin),
            switchMap(() =>
                this.authLogic.authenticateViaBearer().pipe(
                    map(user => signinSuccess({ user: user })),
                    catchError(err => of(signinError()))
                )
            )
        )
    );

    signoutBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signoutBegin),
            switchMap(() =>
                this.authLogic.signOut().pipe(
                    map(_ => signoutFinished()),
                    catchError(err => of(signoutFinished()))
                )
            )
        )
    );

    updateNamesBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateNamesBegin),
            switchMap((action) =>
                this.settingsApi.updateAccountNames({ firstname: action.firstname, lastname: action.lastname }).pipe(
                    map(_ => updateNamesFinish(action)),
                    catchError(err => of(updateNamesError()))
                )
            )
        )
    );


    constructor(private actions$: Actions, private authLogic: AuthService, private settingsApi: SettingsApiService) {}

    ngrxOnInitEffects(): Action {
        return signinBegin();
    }
    
}