import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "src/app/app.module";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { CreateRepositoryDTOInterface } from "src/app/shared/interfaces/create-repository-dto.interface";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";
import { UpdateRepositoryDTOInterface } from "src/app/shared/interfaces/update-repository-dto.interface";
import { CreateRepositoryModel } from "../feature/client-layout-with-nav/models/create-repository.model";

@Injectable({
    providedIn: 'root'
})
export class RepositoryApiService {

    constructor(private httpClient: HttpClient,
                @Inject(BASE_URL) private baseUrl: string) { }

    public loadRepository(repositoryId: string): Observable<RepoInterface> {
        return this.httpClient.get<RepoInterface>(this.baseUrl + '/api/repository', { params: { repositoryId: repositoryId } });
    }

    public loadRepositories(batchOffset: number = 0): Observable<BatchWrapperInterface<RepoInterface>> {
        return this.httpClient.get<BatchWrapperInterface<RepoInterface>>(this.baseUrl + '/api/repositories', {params: { offset: batchOffset }});
    }

    public createRepository(createModel: CreateRepositoryModel): Observable<RepoInterface> {
        return this.httpClient.post<RepoInterface>(this.baseUrl + '/api/repository', <CreateRepositoryDTOInterface>{
            name: createModel.name,
            description: createModel.description
        });
    }

    public updateRepository(repositoryId: string, updateRepo: UpdateRepositoryDTOInterface): Observable<void> {
        return this.httpClient.put<void>(this.baseUrl + '/api/repository', { repositoryId: repositoryId, ...updateRepo });
    }

    public deleteRepository(repositoryId: string): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl + '/api/repository', { params: { repositoryId: repositoryId } });
    }
}