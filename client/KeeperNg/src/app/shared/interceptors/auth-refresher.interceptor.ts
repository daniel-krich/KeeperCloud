import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, EMPTY, finalize, Observable, of, switchMap, tap, throwError, throwIfEmpty } from 'rxjs';
import { AuthService } from '../data-access/auth.service';
import { BASE_URL } from 'src/app/app.module';
import { Router } from '@angular/router';
import { AppStateInterface } from '../data-access/state/app.state';
import { Store } from '@ngrx/store';
import { signinRefreshed, signoutFinished } from '../data-access/state/authentication/authentication.actions';

@Injectable()
export class AuthRefresherInterceptor implements HttpInterceptor {
  constructor(@Inject(BASE_URL) private baseUrl: string,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppStateInterface>) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if(request.url.startsWith(this.baseUrl) || request.url.startsWith('/')) { // check domain to prevent token leak.
            return next.handle(request).pipe(
                catchError((error) => {
                    if (error.status === 401) {
                        console.log("[Auth] Auth token invalidated, trying to get a brand new token...");
                        let finishedWithError = false;
                        return this.authService.refreshTokens().pipe(
                            switchMap((user) => {
                                this.store.dispatch(signinRefreshed({ user: user }));
                                const newRequest = request.clone({
                                    setHeaders: {
                                    Authorization: `Bearer ${this.authService.getJwtFromStorage()}`,
                                    },
                                });
                                return next.handle(newRequest);
                            }),
                            catchError(() => { // Retreive refresh token error will trigger logout and a redirect.
                                this.store.dispatch(signoutFinished());
                                this.authService.removeJwtFromStorage();
                                this.router.navigate(['/auth']);
                                console.log("[Auth] Failed to get a new token, redirecting to auth.");
                                finishedWithError = true;
                                return EMPTY;
                            }),
                            finalize(() => {
                                if(!finishedWithError) {
                                    console.log("[Auth] Successfully got a new token.");
                                }
                            })
                            
                        );
                    }
                    else if(error.status.toString().startsWith('4') && request.url.includes('/auth')) {
                        this.authService.removeJwtFromStorage()
                    }
                    return EMPTY;
                })
            );
        }
        else return next.handle(request);
    }
}