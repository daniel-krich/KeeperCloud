import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, takeWhile, map, Observable, of, switchMap, defer, tap, takeUntil, skip, skipWhile } from "rxjs";
import { AppStateInterface } from "../data-access/state/app.state";
import { selectIsUserLoggedIn, selectAuthStateStatus, selectAuthUser } from "../data-access/state/authentication/authentication.selectors";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private store: Store<AppStateInterface>, private router: Router) { }

    canActivate() {
        return this.store.select(selectIsUserLoggedIn).pipe(
            switchMap(loggedIn => {
                if (loggedIn) {
                    return of(true);
                }
                return defer(() =>
                    this.store.select(selectAuthStateStatus).pipe(
                        skipWhile(auth => auth == 'loading'),
                        map(auth => {
                            if(auth !== 'success') {
                                this.router.navigate(['/']);
                                return false;
                            }
                            return true;
                        })
                    )
                );
            }),
        );
    }

}