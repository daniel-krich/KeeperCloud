import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../data-access/auth.service';

@Injectable()
export class AuthRefresherInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Send a request to the refresh endpoint to get a new JWT
          return this.authService.refreshTokens().pipe(
            tap(token => {
                if(!token) {
                    throwError(() => new Error('Refresh tokens failed'));
                }
            }),
            switchMap((newToken) => {

              this.authService.setJwtToStorage(newToken!);

              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken?.token}`,
                },
              });
              // Re-send the original request with the new JWT
              return next.handle(newRequest);
            })
          );
        }
        return throwError(() => {
            this.authService.removeJwtFromStorage();
        });
      })
    );
  }
}
