import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap, throwError, throwIfEmpty } from 'rxjs';
import { AuthService } from '../data-access/auth.service';
import { BASE_URL } from 'src/app/app.module';

@Injectable()
export class AuthRefresherInterceptor implements HttpInterceptor {
  constructor(@Inject(BASE_URL) private baseUrl: string,
              private authService: AuthService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if(request.url.startsWith(this.baseUrl) || request.url.startsWith('/')) { // check domain to prevent token leak.

            return next.handle(request).pipe(
                catchError((error) => {

                    if (error.status === 401) {
                        return this.authService.refreshTokens().pipe(
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