import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { BASE_URL } from "src/app/app.module";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";

@Injectable({
    providedIn: 'root'
})
export class RepositoryFilesDataService {
    constructor(private httpClient: HttpClient,
                @Inject(BASE_URL) private baseUrl: string) { }

    public loadRepositoryFiles(repositoryId: string, batchOffset: number = 0): Observable<BatchWrapperInterface<RepoFileInterface>> {
        return this.httpClient.get<BatchWrapperInterface<RepoFileInterface>>(this.baseUrl + `/api/repository/${repositoryId}/files`, {params: { batchOffset: batchOffset }});
    }

    public downloadRepositoryFiles(repositoryId: string, files: RepoFileInterface[]): Observable<{ blob: Blob | null, progress: number | null }> {
        const apprxFileSize = files.reduce((acc, curr) => acc+curr.fileSize, 0);
        return this.httpClient.post(this.baseUrl + '/api/file/download', files.map(x => x.id), { responseType: 'blob', observe: 'events', reportProgress: true, params: { repositoryId: repositoryId } }).pipe(
            filter(event => event.type === HttpEventType.DownloadProgress || event.type === HttpEventType.Response),
            map((event: HttpEvent<Blob>) => {
                switch (event.type) {
                    case HttpEventType.DownloadProgress:
                        return { blob: null, progress: Math.round((event.loaded * 100) / apprxFileSize) };
                    case HttpEventType.Response:
                        return { blob: event.body, progress: 100 };
                    default:
                        return { blob: null, progress: null };
                }
            })
        );
    }

    public triggerFileDownloadFromBlob(blob: Blob, name: string, archive: boolean = true): void {
        const fileName = archive ? `download-${new Date().toISOString()}.zip` : name;
        let url: string | null = null;
        try
        {
            url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
        }
        catch { }
        finally{
            if(url) {
                window.URL.revokeObjectURL(url);
            }
        }
    }
    
}