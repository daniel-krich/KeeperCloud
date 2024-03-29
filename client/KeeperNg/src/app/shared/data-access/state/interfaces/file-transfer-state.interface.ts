import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";

export interface DownloadStateInterface {
    files: RepoFileInterface[];
    repoId: string | null;
    progress: number;
    error: string;
    status: 'idle' | 'error' | 'downloading' | 'done';
}

export interface UploadStateInterface {
    files: File[];
    repoId: string | null;
    progress: number;
    error: string;
    status: 'idle' | 'error' | 'uploading' | 'done';
}

export interface FileTransferStateInterface {
    downloads: DownloadStateInterface;
    uploads: UploadStateInterface;
    fileTransferState: 'open' | 'closed';
}