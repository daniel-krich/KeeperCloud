import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { JwtTokenDTOInterface } from '../interfaces/jwt-token-dto.interface';
import { SigninDTOInterface } from '../interfaces/sign-in-dto.interface';
import { UserInterface } from '../interfaces/user.interface';
import { AppStateInterface } from './state/app.state';
import { signinSuccess } from './state/authentication/authentication.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthLogicService {

    private jwtObjectName: string = 'jwt-token';
    constructor(private httpClient: HttpClient,
                private store: Store<AppStateInterface>,
                @Inject(BASE_URL) private baseUrl: string) { }

    public authenticateViaCredentials(username: string, password: string): Observable<JwtTokenDTOInterface | null> {
        return this.httpClient.post<JwtTokenDTOInterface | null>(this.baseUrl + '/api/auth/sign-in', <SigninDTOInterface>{ email: username, password: password }).pipe(
            tap(jwt => {
                if(jwt) {
                    this.jwtFromLocalStorage = jwt;
                    this.store.dispatch(signinSuccess({ user: this.jwtPayloadFromLocalStorage! }));
                }
                else {
                    this.jwtFromLocalStorage = null;
                }
            })
        );
    }

    public getRefreshTokens(): Observable<JwtTokenDTOInterface | null> {
        return this.httpClient.post<JwtTokenDTOInterface | null>(this.baseUrl + '/api/auth/refresh', { RefreshToken: this.jwtFromLocalStorage!.refreshToken });
    }

    public authenticateViaBearer(): Observable<any> {
        if(!this.jwtFromLocalStorage) return throwError(() => {});
        return this.httpClient.get(this.baseUrl + '/api/auth/validate');
    }

    public get jwtPayloadFromLocalStorage() : UserInterface | null  {
        const jwt = localStorage.getItem(this.jwtObjectName);
        if (!jwt) return null;

        const [header, payload, signature] = jwt.split('.');
        if (!header || !payload || !signature) return null;

        const decodedPayload = JSON.parse(window.atob(payload));
        return decodedPayload.user;
    }

    public get jwtFromLocalStorage(): JwtTokenDTOInterface | null {
        let jwt = localStorage.getItem(this.jwtObjectName);
        if(jwt) return JSON.parse(jwt);
        else return null;
    }

    public set jwtFromLocalStorage(jwt: JwtTokenDTOInterface | null) {
        localStorage.setItem(this.jwtObjectName, JSON.stringify(jwt));
    }
}
