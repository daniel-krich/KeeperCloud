import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { JwtTokenDTOInterface } from '../interfaces/jwt-token-dto.interface';
import { SigninDTOInterface } from '../interfaces/sign-in-dto.interface';
import { UserInterface } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private jwtObjectName: string = 'jwt-token';
    constructor(@Inject(BASE_URL) private baseUrl: string,
                private httpClient: HttpClient,
                private localService: LocalStorageService) { }

    public authenticateViaCredentials(username: string, password: string): Observable<JwtTokenDTOInterface | null> {
        return this.httpClient.post<JwtTokenDTOInterface | null>(this.baseUrl + '/api/auth/sign-in', <SigninDTOInterface>{ email: username, password: password }).pipe(
            tap(jwt => jwt ? this.setJwtToStorage(jwt) : this.removeJwtFromStorage())
        );
    }

    public signOut(): Observable<void> {
        return this.httpClient.get<void>(this.baseUrl + '/api/auth/exit').pipe(
            tap(_ => this.removeJwtFromStorage())
        );
    }

    public refreshTokens(): Observable<JwtTokenDTOInterface | null> {
        let refreshToken = this.getJwtFromStorage()?.refreshToken;
        if(refreshToken) {
            return this.httpClient.post<JwtTokenDTOInterface>(this.baseUrl + '/api/auth/refresh', { RefreshToken: refreshToken });
        }
        return throwError(() => new Error('Refresh token is missing'));
    }

    public authenticateViaBearer(): Observable<UserInterface | null> {
        if(!this.getJwtFromStorage()) return throwError(() => new Error('Jwt is missing'));
        return this.httpClient.get(this.baseUrl + '/api/auth/validate').pipe(
            map(_ => this.getUserFromStorage())
        );
    }

    public transformTokenToUser(jwt: string) : UserInterface | null {
        const [header, payload, signature] = jwt.split('.');
        if (!header || !payload || !signature) return null;
        const decodedPayload = JSON.parse(window.atob(payload));
        
        
        return decodedPayload.user;
    }

    public getUserFromStorage() : UserInterface | null  {
        const jwt = this.localService.get<JwtTokenDTOInterface>(this.jwtObjectName);
        if (!jwt) return null;
        return this.transformTokenToUser(jwt.token);
    }

    public getJwtFromStorage(): JwtTokenDTOInterface | null {
        return this.localService.get<JwtTokenDTOInterface>(this.jwtObjectName);
    }

    public setJwtToStorage(jwt: JwtTokenDTOInterface) {
        this.localService.set<JwtTokenDTOInterface>(this.jwtObjectName, jwt);
    }

    public removeJwtFromStorage() {
        this.localService.remove(this.jwtObjectName);
    }
}
