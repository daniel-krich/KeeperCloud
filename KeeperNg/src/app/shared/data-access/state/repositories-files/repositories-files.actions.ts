import { createAction, props } from "@ngrx/store";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";

export const loadRepoFilesBatchInit = createAction(
    '[Repository Files Load] Load Repository Files Batch Init',
    props<{ repositoryId: string }>()
);

export const loadRepoFilesBatchNext = createAction(
    '[Repository Files Load] Load Repository Files Batch Next',
    props<{ repositoryId: string }>()
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