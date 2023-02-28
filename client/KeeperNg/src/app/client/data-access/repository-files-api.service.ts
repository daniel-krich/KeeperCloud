import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { BASE_URL } from "src/app/app.module";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";

@Injectable({
    providedIn: 'root'
})
export class RepositoryFilesApiService {
    constructor(private httpClient: HttpClient,
                @Inject(BASE_URL) private baseUrl: string) { }

    public loadRepositoryFiles(repositoryId: string, batchOffset: number = 0, take?: number): Observable<BatchWrapperInterface<RepoFileInterface>> {
        return this.httpClient.get<BatchWrapperInterface<RepoFileInterface>>(this.baseUrl + `/api/repository/files`, {params: { repositoryId: repositoryId, offset: batchOffset, ...(take) && { take: take } }});
    }

    public deleteRepositoryFiles(repositoryId: string, files: RepoFileInterface[]): Observable<void> {
        return this.httpClient.post<void>(this.baseUrl + `/api/repository/files/remove-many`, { repositoryId: repositoryId, fileIds: files.map(x => x.id) });
    }

    public uploadRepositoryFiles(repositoryId: string, files: File[]): Observable<{ files: RepoFileInterface[] | null, progress: number | null }> {
        const formData = new FormData();
        for (const file of files) {
            formData.append('files', file, file.name);
        }
        return this.httpClient.post<RepoFileInterface[]>(this.baseUrl + `/api/repository/${repositoryId}/storage/upload`, formData, { observe: 'events', reportProgress: true }).pipe(
            filter(event => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.Response),
            map((event: HttpEvent<RepoFileInterface[]>) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        return { files: null, progress: event.total ? Math.round((event.loaded * 100) / event.total) : 0 };
                    case HttpEventType.Response:
                        return { files: event.body, progress: 100 };
                    default:
                        return { files: null, progress: null };
                }
            })
        );
    }

    public downloadRepositoryFiles(repositoryId: string, files: RepoFileInterface[]): Observable<{ blob: Blob | null, progress: number | null }> {
        const apprxFileSize = files.reduce((acc, curr) => acc+curr.fileSize, 0);
        return this.httpClient.post(this.baseUrl + `/api/repository/files/download-many`, { repositoryId: repositoryId, fileIds: files.map(x => x.id) }, { responseType: 'blob', observe: 'events', reportProgress: true }).pipe(
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