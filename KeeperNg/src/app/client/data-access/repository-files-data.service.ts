import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "src/app/app.module";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";

@Injectable({
    providedIn: 'root'
})
export class RepositoryFilesDataService {

    constructor(private httpClient: HttpClient,
                @Inject(BASE_URL) private baseUrl: string) { }

    public loadRepositoryFiles(repositoryId: string, batchOffset: number = 0): Observable<BatchWrapperInterface<RepoFileInterface>> {
        return this.httpClient.get<BatchWrapperInterface<RepoFileInterface>>(this.baseUrl + `/api/repository/${repositoryId}/files`, {params: { batchOffset: batchOffset }});
    }
    
}