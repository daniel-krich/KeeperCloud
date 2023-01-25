import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../app.state";


export const selectFileTransferState = (state: AppStateInterface) => state.fileTransfer;

export const selectIsFileTransferOpen = createSelector(
    selectFileTransferState,
    e => e.fileTransferState
);

export const selectDownloads = createSelector(
    selectFileTransferState,
    e => e.downloads.files
);

export const selectDownloadsState = createSelector(
    selectFileTransferState,
    e => e.downloads
);

export const selectDownloadsStatus = createSelector(
    selectFileTransferState,
    e => ({ progress: e.downloads.progress, status: e.downloads.status, error: e.downloads.error })
);

export const selectUploadsState = createSelector(
    selectFileTransferState,
    e => e.uploads
);