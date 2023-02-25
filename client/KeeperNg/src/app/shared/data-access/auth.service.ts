import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError, throwIfEmpty } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { SignInModel } from 'src/app/main/feature/auth/models/sign-in.model';
import { SignupModel } from 'src/app/main/feature/auth/models/sign-up.model';
import { JwtTokenDTOInterface } from '../interfaces/jwt-token-dto.interface';
import { SigninDTOInterface } from '../interfaces/sign-in-dto.interface';
import { SignupDTOInterface } from '../interfaces/sign-up-dto.interface';
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

    public authenticateViaCredentials(signin: SignInModel): Observable<JwtTokenDTOInterface> {
        return this.httpClient.post<JwtTokenDTOInterface>(this.baseUrl + '/api/authentication/sign-in', <SigninDTOInterface>{ email: signin.email, password: signin.password }).pipe(
            throwIfEmpty(() => new Error('Error while getting Jwt token')),
            tap(jwt => this.setJwtToStorage(jwt)),
            catchError(_ => {
                return throwError(() => new Error('Error while getting Jwt token'));
            })
        );
    }

    public signUp(signUp: SignupModel): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl + '/api/authentication/sign-up',
            <SignupDTOInterface>{
                email: signUp.email,
                password: signUp.password,
                firstname: signUp.firstname,
                lastname: signUp.lastname
            });
    }

    public signOut(): Observable<void> {
        return this.httpClient.get<void>(this.baseUrl + '/api/authentication/exit').pipe(
            tap(_ => this.removeJwtFromStorage())
        );
    }

    public refreshTokens(): Observable<JwtTokenDTOInterface> {
        let refreshToken = this.getJwtFromStorage()?.refreshToken;
        if (refreshToken) {
            return this.httpClient.post<JwtTokenDTOInterface>(this.baseUrl + '/api/authentication/refresh', { RefreshToken: refreshToken }).pipe(
                throwIfEmpty(() => new Error('Refresh token is missing'))
            );
        }
        return throwError(() => new Error('Refresh token is missing'));
    }

    public authenticateViaBearer(): Observable<UserInterface> {
        if (!this.getJwtFromStorage()) return throwError(() => new Error('Jwt is missing'));
        return this.httpClient.get(this.baseUrl + '/api/authentication/validate').pipe(
            switchMap(_ => {
                let user = this.getUserFromStorage();
                if (user) return of(user);
                else return throwError(() => new Error('Unable to retreive user'))
            })
        );
    }

    public transformTokenToUser(jwt: string): UserInterface | null {
        const [header, payload, signature] = jwt.split('.');
        if (!header || !payload || !signature) return null;
        const decodedPayload = JSON.parse(window.atob(payload));


        return decodedPayload.user;
    }

    public getUserFromStorage(): UserInterface | null {
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