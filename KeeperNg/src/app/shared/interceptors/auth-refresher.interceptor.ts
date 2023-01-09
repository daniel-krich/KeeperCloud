import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap, throwError, throwIfEmpty } from 'rxjs';
import { AuthService } from '../data-access/auth.service';
import { BASE_URL } from 'src/app/app.module';
import { Router } from '@angular/router';
import { AppStateInterface } from '../data-access/state/app.state';
import { Store } from '@ngrx/store';
import { signoutFinished } from '../data-access/state/authentication/authentication.actions';

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
                        return this.authService.refreshTokens().pipe(
                            catchError(refreshError => { // Retreive refresh token error will trigger logout and a redirect.
                                this.store.dispatch(signoutFinished());
                                this.authService.removeJwtFromStorage();
                                this.router.navigate(['/auth']);
                                return throwError(() => refreshError);
                            }),
                            switchMap((newToken) => {
                                this.authService.setJwtToStorage(newToken);
                                const newRequest = request.clone({
                                    setHeaders: {
                                    Authorization: `Bearer ${newToken.token}`,
                                    },
                                });
                                return next.handle(newRequest);
                            })
                        );
                    }
                    else if(error.status.toString().startsWith('4') && request.url.includes('/auth')) return throwError(() => of(this.authService.removeJwtFromStorage()));
                    else return throwError(() => error);
                    
                })
            );
        }
        else return next.handle(request);
    }
}