import { createAction, props } from "@ngrx/store";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";

export const downloadBegin = createAction(
    '[Download Files] Download begin',
    props<{ repositoryId: string, files: RepoFileInterface[] }>()
);

export const toggleFileTransfer = createAction(
    '[FileTransfer Toggle] FileTransfer Menu Open/Close'
);

export const downloadProgress = createAction(
    '[Download Files] Download progress',
    props<{ progress: number }>()
);

export const downloadRetry = createAction(
    '[Download Files] Download Retry begin'
);

export const downloadSuccess = createAction(
    '[Download Files] Download success',
    props<{ file: Blob }>()
);

export const downloadError = createAction(
    '[Download Files] Download error',
    props<{ error: string }>()
);