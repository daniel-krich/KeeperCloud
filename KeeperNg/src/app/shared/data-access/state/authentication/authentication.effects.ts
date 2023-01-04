import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of } from "rxjs";
import { AuthLogicService } from "../../auth-logic.service";
import { signinBegin, signinError, signinSuccess } from "./authentication.actions";


@Injectable()
export class AuthenticationEffects {

    signinBegin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signinBegin),
            switchMap(() =>
                this.authLogic.authenticateViaBearer().pipe(
                    map(_ => signinSuccess({ user: this.authLogic.jwtPayloadFromLocalStorage! })),
                    catchError(err => of(signinError()))
                )
            )
        )
    );


    constructor(private actions$: Actions, private authLogic: AuthLogicService) {}
    
}