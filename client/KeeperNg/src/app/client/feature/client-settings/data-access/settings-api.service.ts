import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { AccountNamesInterface } from '../interfaces/account-names.interface';

@Injectable({
    providedIn: 'root'
})
export class SettingsApiService {

    constructor(private httpClient: HttpClient,
                @Inject(BASE_URL) private baseUrl: string) { }

    public updateAccountNames(accountNames: AccountNamesInterface): Observable<void> {
        return this.httpClient.put<void>(this.baseUrl + '/api/account/update-names', accountNames);
    }

}