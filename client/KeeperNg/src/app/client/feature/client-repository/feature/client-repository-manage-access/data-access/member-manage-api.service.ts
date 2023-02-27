import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { PageWrapperInterface } from 'src/app/shared/interfaces/page-wrapper.interface';
import { RepositoryMemberCreateDtoInterface } from '../interfaces/repository-member-create-dto.interface';
import { RepositoryMemberInterface } from '../interfaces/repository-member.interface';

@Injectable({
    providedIn: 'root'
})
export class MemberManageApiService {

    constructor(private httpClient: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }

    public fetchPaginatedMembers(repositoryId: string, page: number): Observable<PageWrapperInterface<RepositoryMemberInterface>> {
        return this.httpClient.get<PageWrapperInterface<RepositoryMemberInterface>>(this.baseUrl + '/api/repository/members', { params: { repositoryId: repositoryId, page: page } });
    }

    public createMember(repositoryId: string, repoMemberDto: RepositoryMemberCreateDtoInterface): Observable<RepositoryMemberInterface> {
        return this.httpClient.post<RepositoryMemberInterface>(this.baseUrl + '/api/repository/members', { repositoryId: repositoryId, member: repoMemberDto });
    }

    public updateMember(repositoryId: string, memberId: string, repoMemberDto: RepositoryMemberCreateDtoInterface): Observable<RepositoryMemberInterface> {
        return this.httpClient.put<RepositoryMemberInterface>(this.baseUrl + '/api/repository/members', { repositoryId: repositoryId, memberId: memberId, member: repoMemberDto });
    }

    public deleteMember(repositoryId: string, memberId: string): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl + '/api/repository/members', { params: { repositoryId: repositoryId, memberId: memberId } });
    }

}