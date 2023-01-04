import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthLogicService } from '../data-access/auth-logic.service';

@Injectable()
export class AuthBearerInterceptor implements HttpInterceptor {

  constructor(private authLogic: AuthLogicService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.authLogic.jwtFromLocalStorage?.token;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(request);
  }
}
