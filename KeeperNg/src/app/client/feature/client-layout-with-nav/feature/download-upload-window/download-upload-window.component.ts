import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { clearFileTransfer } from 'src/app/shared/data-access/state/file-transfer/file-transfer.actions';
import { selectDownloadsState, selectFileTransferState, selectIsFileTransferOpen, selectUploadsState } from 'src/app/shared/data-access/state/file-transfer/file-transfer.selectors';
import { FileTransferStateInterface } from 'src/app/shared/data-access/state/interfaces/file-transfer-state.interface';
import { ConfirmDialogComponent } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.model';

@Component({
  selector: 'app-download-upload-window',
  templateUrl: './download-upload-window.component.html',
  styleUrls: ['./download-upload-window.component.scss']
})
export class DownloadUploadWindowComponent {

    public isVisible$ = this.store.select(selectIsFileTransferOpen);

    public downloadState$ = this.store.select(selectDownloadsState);
    public uploadState$ = this.store.select(selectUploadsState);

    public fileTransferState$ = this.store.select(selectFileTransferState)

    constructor(private store: Store<AppStateInterface>, private dialog: MatDialog) { }

    public closeTab(fileTransferState: FileTransferStateInterface): void {
        if(fileTransferState.downloads.status === 'downloading' || fileTransferState.uploads.status === 'uploading') {
            const dialogData = new ConfirmDialogModel('Confirm Action', `
                Are you sure you want to close the file-transfer window?
                This will cancel any active download or upload.
            `);

            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "400px",
                data: dialogData
            });

            dialogRef.afterClosed().subscribe((isOk: boolean) => {
                if(isOk) {
                    this.store.dispatch(clearFileTransfer());
                }
            });
        }
        else {
            this.store.dispatch(clearFileTransfer());
        }
    }
}