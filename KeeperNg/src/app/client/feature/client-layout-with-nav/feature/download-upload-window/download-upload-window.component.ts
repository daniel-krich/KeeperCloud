import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { toggleFileTransfer } from 'src/app/shared/data-access/state/file-transfer/file-transfer.actions';
import { selectDownloadsState, selectIsFileTransferOpen } from 'src/app/shared/data-access/state/file-transfer/file-transfer.selectors';

@Component({
  selector: 'app-download-upload-window',
  templateUrl: './download-upload-window.component.html',
  styleUrls: ['./download-upload-window.component.scss']
})
export class DownloadUploadWindowComponent {

    public isVisible$ = this.store.select(selectIsFileTransferOpen);
    public downloadState$ = this.store.select(selectDownloadsState);

    constructor(private store: Store<AppStateInterface>) { }

    public closeTab(): void {
        this.store.dispatch(toggleFileTransfer());
    }
}
