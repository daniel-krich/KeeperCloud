import { createAction, props } from "@ngrx/store";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";

export const loadRepoStart = createAction(
    '[Repository Load] Repository Load Start',
    props<{ repositoryId: string }>()
);

export const loadRepoSuccess = createAction(
    '[Repository Load] Repository Load Success',
    props<{ repository: RepoInterface }>()
);

export const loadRepoSuccessEmpty = createAction(
    '[Repository Load] Repository Load Success But Empty'
);

export const loadRepoError = createAction(
    '[Repository Load] Repository Load Error',
    props<{error: string}>()
);

//

export const loadRepoBatchInit = createAction(
    '[Repository Load] Repository Load Batch Init'
);

export const loadRepoBatchNext = createAction(
    '[Repository Load] Repository Load Batch Next'
);

export const loadRepoBatchSuccess = createAction(
    '[Repository Load] Repository Load Batch Success',
    props<{ batch: BatchWrapperInterface<RepoInterface> }>()
);

export const loadRepoBatchError = createAction(
    '[Repository Load] Repository Load Batch Error',
    props<{error: string}>()
);

export const createRepo = createAction(
    '[Repository Create] Repository Create',
    props<{ repository: RepoInterface }>()
);