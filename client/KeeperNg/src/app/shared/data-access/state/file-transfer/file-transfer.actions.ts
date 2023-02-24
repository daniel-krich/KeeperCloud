import { createAction, props } from "@ngrx/store";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";


export const clearFileTransfer = createAction(
    '[FileTransfer Clear] Clear and reset the filetransfer state'
);

//

export const downloadBegin = createAction(
    '[Download Files] Download begin',
    props<{ repositoryId: string, files: RepoFileInterface[] }>()
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

//

export const uploadBegin = createAction(
    '[Upload Files] Upload begin',
    props<{ repositoryId: string, files: File[] }>()
);

export const uploadProgress = createAction(
    '[Upload Files] Upload progress',
    props<{ progress: number }>()
);

export const uploadRetry = createAction(
    '[Upload Files] Upload Retry begin'
);

export const uploadSuccess = createAction(
    '[Upload Files] Upload success',
    props<{ repositoryId: string, files: RepoFileInterface[] }>()
);

export const uploadError = createAction(
    '[Upload Files] Upload error',
    props<{ error: string }>()
);