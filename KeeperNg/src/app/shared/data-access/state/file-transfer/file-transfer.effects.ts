import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, throwError, withLatestFrom } from "rxjs";
import { RepositoryFilesDataService } from "src/app/client/data-access/repository-files-data.service";
import { AppStateInterface } from "../app.state";
import { appendRepoFiles } from "../repositories-files/repositories-files.actions";
import { increaseRepositoryFilesStats } from "../repository/repository.actions";
import { downloadBegin, downloadError, downloadProgress, downloadRetry, downloadSuccess, uploadBegin, uploadError, uploadProgress, uploadRetry, uploadSuccess } from "./file-transfer.actions";
import { selectDownloads, selectDownloadsState, selectFileTransferState, selectUploadsState } from "./file-transfer.selectors";



@Injectable()
export class FileTransferEffects {

    downloadBegin$ = createEffect(() =>
        this.actions.pipe(
            ofType(downloadBegin, downloadRetry),
            withLatestFrom(this.store.select(selectFileTransferState)),
            switchMap(([_, fileTransferState]) => {
                if (fileTransferState.downloads.repoId) {
                    return this.repoFilesService.downloadRepositoryFiles(fileTransferState.downloads.repoId, fileTransferState.downloads.files).pipe(
                        withLatestFrom(this.store.select(selectDownloadsState)),
                        switchMap(([response, downloadState]) => {
                            if (downloadState.status === 'idle') return throwError(() => new Error('Download canceled'));
                            if (response.progress == null && response.blob != null) return of(downloadError({ error: 'Error while downloading' }));
                            if (response.blob !== null && response.progress === 100) {
                                return of(downloadSuccess({ file: response.blob }));
                            }
                            else {
                                return of(downloadProgress({ progress: response.progress ?? 0 }));
                            }
                        }),
                        catchError((err: Error) => of(downloadError({ error: err.message })))
                    );
                }
                return of(downloadError({ error: 'repo id is null' }));
            })
        )
    );

    downloadSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(downloadSuccess),
            withLatestFrom(this.store.select(selectFileTransferState)),
            tap(([action, fileTransferState]) => {
                if (fileTransferState.downloads.files.length > 1) {
                    this.repoFilesService.triggerFileDownloadFromBlob(action.file, '');
                }
                else if (fileTransferState.downloads.files.length == 1) {
                    this.repoFilesService.triggerFileDownloadFromBlob(action.file, fileTransferState.downloads.files[0].name, false);
                }
            })
        )
        , { dispatch: false });


    uploadBegin$ = createEffect(() =>
        this.actions.pipe(
            ofType(uploadBegin, uploadRetry),
            withLatestFrom(this.store.select(selectFileTransferState)),
            switchMap(([_, fileTransferState]) => {
                if (fileTransferState.uploads.repoId) {
                    return this.repoFilesService.uploadRepositoryFiles(fileTransferState.uploads.repoId, fileTransferState.uploads.files).pipe(
                        withLatestFrom(this.store.select(selectUploadsState)),
                        switchMap(([response, uploadState]) => {
                            if (uploadState.status === 'idle') return throwError(() => new Error('Upload canceled'));
                            if (response.progress == null && response.files != null) return of(uploadError({ error: 'Error while uploading' }));
                            if (response.files !== null && response.progress === 100) {
                                return of(uploadSuccess({ repositoryId: fileTransferState.uploads.repoId!, files: response.files ?? [] }));
                            }
                            else {
                                return of(uploadProgress({ progress: response.progress ?? 0 }));
                            }
                        }),
                        catchError((err: Error) => of(uploadError({ error: err.message })))
                    );
                }
                return of(uploadError({ error: 'repo id is null' }));
            })
        )
    );

    uploadSuccess$ = createEffect(() =>
        this.actions.pipe(
            ofType(uploadSuccess),
            switchMap(action => of(
                increaseRepositoryFilesStats({ repositoryId: action.repositoryId, files: action.files }),
                appendRepoFiles({ repositoryId: action.repositoryId, files: action.files })
            ))
        )
    );

    constructor(private store: Store<AppStateInterface>,
        private actions: Actions,
        private repoFilesService: RepositoryFilesDataService) { }
}