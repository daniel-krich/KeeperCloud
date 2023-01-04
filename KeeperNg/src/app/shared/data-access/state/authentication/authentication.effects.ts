import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of, throwIfEmpty, tap, throwError } from "rxjs";
import { AuthService } from "../../auth.service";
import { signinBegin, signinError, signinSuccess, signoutBegin, signoutFinished } from "./authentication.actions";


@Injectable()
export class AuthenticationEffects {

    signinBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signinBegin),
            switchMap(() =>
                this.authLogic.authenticateViaBearer().pipe(
                    tap(user => {
                        if(!user) {
                            throwError(() => new Error('User is empty'))
                        }
                    }),
                    map(user => signinSuccess({ user: user! })),
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
    
}