import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError, throwIfEmpty } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { SignInModel } from 'src/app/main/feature/auth/models/sign-in.model';
import { SignupModel } from 'src/app/main/feature/auth/models/sign-up.model';
import { SigninDTOInterface } from '../interfaces/sign-in-dto.interface';
import { SignupDTOInterface } from '../interfaces/sign-up-dto.interface';
import { UserInterface } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private jwtObjectName: string = 'jwt-token';
    private jwtResponseHeader: string = 'X-Token';

    constructor(@Inject(BASE_URL) private baseUrl: string,
        private httpClient: HttpClient,
        private localService: LocalStorageService) { }

    public authenticateViaCredentials(signin: SignInModel): Observable<UserInterface> {
        return this.httpClient.post<UserInterface>(this.baseUrl + '/api/authentication/sign-in', <SigninDTOInterface>{ email: signin.email, password: signin.password }, { observe: 'response' }).pipe(
            throwIfEmpty(),
            tap(x => this.setJwtToStorage(x.headers.get(this.jwtResponseHeader))),
            map(x => x.body!)
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

    public refreshTokens(): Observable<UserInterface> {
        return this.httpClient.put<UserInterface>(this.baseUrl + '/api/authentication/refresh', null, { observe: 'response' }).pipe(
            throwIfEmpty(),
            tap(x => this.setJwtToStorage(x.headers.get(this.jwtResponseHeader))),
            map(x => x.body!)
        );
    }

    public authenticateViaBearer(): Observable<UserInterface> {
        if (!this.getJwtFromStorage()) return throwError(() => new Error('Jwt is missing'));
        return this.httpClient.get<UserInterface>(this.baseUrl + '/api/authentication/validate');
    }

    public getJwtFromStorage(): string | null {
        return this.localService.get<string>(this.jwtObjectName);
    }

    public setJwtToStorage(jwt: string | null) {
        if (jwt) {
            this.localService.set<string>(this.jwtObjectName, jwt);
        }
        else {
            this.removeJwtFromStorage();
        }
    }

    public removeJwtFromStorage() {
        this.localService.remove(this.jwtObjectName);
    }
}
