import { createAction, props } from "@ngrx/store";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";


export const clearAllRepoFiles = createAction(
    '[Repository Files Clear] Clear and reset the repository files'
);

export const loadRepoFilesBatchInit = createAction(
    '[Repository Files Load] Load Repository Files Batch Init',
    props<{ repositoryId: string }>()
);

export const loadRepoFilesBatchNext = createAction(
    '[Repository Files Load] Load Repository Files Batch Next',
    props<{ repositoryId: string, take?: number }>()
);

export const loadRepoFilesBatchSuccess = createAction(
    '[Repository Files Load] Load Repository Files Batch Success',
    props<{ repositoryId: string, repositoryFilesBatch: BatchWrapperInterface<RepoFileInterface> }>()
);

export const loadRepoFilesBatchSuccessEmpty = createAction(
    '[Repository Files Load] Load Repository Files Batch Success Empty',
    props<{ repositoryId: string }>()
);

export const loadRepoFilesBatchError = createAction(
    '[Repository Files Load] Load Repository Files Batch Error',
    props<{ repositoryId: string, error: string }>()
);

export const appendRepoFiles = createAction(
    '[Repository Files Add] Append Repository Files',
    props<{ repositoryId: string, files: RepoFileInterface[] }>()
);

export const deleteRepoFilesBegin = createAction(
    '[Repository Files Delete] Delete Repository Files Begin',
    props<{ repositoryId: string, files: RepoFileInterface[] }>()
);

export const deleteRepoFilesDone = createAction(
    '[Repository Files Delete] Delete Repository Files Done',
    props<{ repositoryId: string, files: RepoFileInterface[] }>()
);

export const removeAllRepoFilesByRepoId = createAction(
    '[All Repository Files Remove] Remove Repository Files',
    props<{ repositoryId: string }>()
);