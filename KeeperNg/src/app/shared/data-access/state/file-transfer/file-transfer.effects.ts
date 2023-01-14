import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { RepositoryFilesDataService } from "src/app/client/data-access/repository-files-data.service";
import { AppStateInterface } from "../app.state";
import { downloadBegin, downloadError, downloadProgress, downloadRetry, downloadSuccess } from "./file-transfer.actions";
import { selectDownloads, selectFileTransferState } from "./file-transfer.selectors";



@Injectable()
export class FileTransferEffects {

    downloadBegin$ = createEffect(() =>
        this.actions.pipe(
            ofType(downloadBegin, downloadRetry),
            withLatestFrom(this.store.select(selectFileTransferState)),
            switchMap(([_, fileTransferState]) => {
                if(fileTransferState.downloads.repoId) {
                    return this.repoFilesService.downloadRepositoryFiles(fileTransferState.downloads.repoId, fileTransferState.downloads.files).pipe(
                        map(response => {
                            if(response.progress == null && response.blob != null) return downloadError({ error: 'Error while downloading' });
                            if(response.progress !== 100) {
                                return downloadProgress({ progress: response.progress ?? 0 });
                            }
                            else return downloadSuccess({ file: response.blob! });
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
                if(fileTransferState.downloads.files.length > 1) {
                    this.repoFilesService.triggerFileDownloadFromBlob(action.file, '');
                }
                else if(fileTransferState.downloads.files.length == 1) {
                    this.repoFilesService.triggerFileDownloadFromBlob(action.file, fileTransferState.downloads.files[0].name, false);
                }
            })
        )
    , { dispatch: false });

    constructor(private store: Store<AppStateInterface>,
                private actions: Actions,
                private repoFilesService: RepositoryFilesDataService) { }
}