import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/app.module';
import { PageWrapperInterface } from 'src/app/shared/interfaces/page-wrapper.interface';
import { RepositoryActivityInterface } from '../interfaces/repository-activity.interface';

@Injectable({
    providedIn: 'root'
})
export class ActivityLogService {

    constructor(private httpClient: HttpClient,
                @Inject(BASE_URL) private baseUrl: string) { }

    public getActivityLogPagination(repositoryId: string, page: number): Observable<PageWrapperInterface<RepositoryActivityInterface>> {
        return this.httpClient.get<PageWrapperInterface<RepositoryActivityInterface>>(this.baseUrl + `/api/repository/activities`, { params: { repositoryId: repositoryId, page: page } });
    }
}