import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { catchError, map, switchMap, of, throwIfEmpty, tap, throwError, defer } from "rxjs";
import { AuthService } from "../../auth.service";
import { signinBegin, signinError, signinSuccess, signoutBegin, signoutFinished } from "./authentication.actions";


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


    constructor(private actions$: Actions, private authLogic: AuthService) {}

    ngrxOnInitEffects(): Action {
        return signinBegin();
    }
    
}