import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthLogicService } from '../data-access/auth-logic.service';

@Injectable()
export class AuthRefresherInterceptor implements HttpInterceptor {
  constructor(private authLogic: AuthLogicService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Send a request to the refresh endpoint to get a new JWT
          return this.authLogic.getRefreshTokens().pipe(
            switchMap((newToken) => {
              this.authLogic.jwtFromLocalStorage = newToken;
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
            this.authLogic.jwtFromLocalStorage = null;
        });
      })
    );
  }
}
