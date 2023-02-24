import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../data-access/auth.service';
import { BASE_URL } from 'src/app/app.module';

@Injectable()
export class AuthBearerInterceptor implements HttpInterceptor {

  constructor(@Inject(BASE_URL) private baseUrl: string,
              private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.startsWith(this.baseUrl) || request.url.startsWith('/')) { // check domain to prevent token leak.

            let token = this.authService.getJwtFromStorage()?.token;
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
}