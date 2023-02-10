import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { RepositoryMemberInterface } from '../interfaces/repository-member.interface';

@Injectable({
    providedIn: 'root'
})
export class MemberManageApiService {

    constructor(private httpClient: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }

    public fetchAllMembers(repositoryId: string): Observable<RepositoryMemberInterface[]> {
        return this.httpClient.get<RepositoryMemberInterface[]>(this.baseUrl + '/api/repositorymember/all', { params: { repositoryId: repositoryId } });
    }

}