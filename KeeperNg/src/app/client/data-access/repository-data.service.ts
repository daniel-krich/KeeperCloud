import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "src/app/app.module";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { CreateRepositoryDTOInterface } from "src/app/shared/interfaces/create-repository-dto.interface";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";
import { CreateRepositoryModel } from "../feature/client-layout-with-nav/models/create-repository.model";

@Injectable({
    providedIn: 'root'
})
export class RepositoryDataService {

    constructor(private httpClient: HttpClient,
                @Inject(BASE_URL) private baseUrl: string) { }

    public loadRepositories(batchOffset: number = 0): Observable<BatchWrapperInterface<RepoInterface>> {
        return this.httpClient.get<BatchWrapperInterface<RepoInterface>>(this.baseUrl + '/api/repository', {params: { batchOffset: batchOffset }});
    }

    public createRepository(createModel: CreateRepositoryModel): Observable<RepoInterface> {
        return this.httpClient.post<RepoInterface>(this.baseUrl + '/api/repository/create', <CreateRepositoryDTOInterface>{
            name: createModel.name,
            description: createModel.description
        });
    }
}