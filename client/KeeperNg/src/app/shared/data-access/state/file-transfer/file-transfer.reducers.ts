import { createReducer, on } from "@ngrx/store";
import { DownloadStateInterface, FileTransferStateInterface } from '../interfaces/file-transfer-state.interface'
import { clearFileTransfer, downloadBegin, downloadError, downloadProgress, downloadRetry, downloadSuccess, uploadBegin, uploadError, uploadProgress, uploadRetry, uploadSuccess } from './file-transfer.actions';


const initState: FileTransferStateInterface = {
    downloads: {
        files: [],
        repoId: null,
        progress: 0,
        error: '',
        status: 'idle'
    },
    uploads: {
        files: [],
        repoId: null,
        progress: 0,
        error: '',
        status: 'idle'
    },
    fileTransferState: 'closed'
};

export const fileTransferReducer = createReducer(
    initState,

    on(clearFileTransfer, (state) => ({
        ...initState
    })),

    on(downloadBegin, (state, { repositoryId, files }) => ({
        ...state,
        downloads: {
            ...state.downloads,
            files: files,
            repoId: repositoryId,
            status: 'downloading',
            progress: 0
        },
        fileTransferState: 'open'
    })),

    on(downloadSuccess, (state) => ({
        ...state,
        downloads: {
            ...state.downloads,
            progress: 100,
            status: 'done'
        }
    })),

    on(downloadError, (state, { error }) => ({
        ...state,
        downloads: {
            ...state.downloads,
            status: 'error',
            error: error,
            progress: 0
        }
    })),

    on(downloadProgress, (state, { progress }) => ({
        ...state,
        downloads: {
            ...state.downloads,
            progress: progress
        }
    })),

    on(downloadRetry, (state) => ({
        ...state,
        downloads: {
            ...state.downloads,
            progress: 0,
            error: '',
            status: 'downloading'
        }
    })),

    on(uploadBegin, (state, { repositoryId, files }) => ({
        ...state,
        uploads: {
            ...state.uploads,
            files: files,
            repoId: repositoryId,
            status: 'uploading',
            progress: 0
        },
        fileTransferState: 'open'
    })),

    on(uploadSuccess, (state) => ({
        ...state,
        uploads: {
            ...state.uploads,
            progress: 100,
            status: 'done'
        }
    })),

    on(uploadError, (state, { error }) => ({
        ...state,
        uploads: {
            ...state.uploads,
            status: 'error',
            error: error,
            progress: 0
        }
    })),

    on(uploadProgress, (state, { progress }) => ({
        ...state,
        uploads: {
            ...state.uploads,
            progress: progress
        }
    })),

    on(uploadRetry, (state) => ({
        ...state,
        uploads: {
            ...state.uploads,
            progress: 0,
            error: '',
            status: 'uploading'
        }
    }))

);