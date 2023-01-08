import { createAction, props } from "@ngrx/store";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";


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
    '[Repository Load] Repository Load Batch Error'
);

export const createRepo = createAction(
    '[Repository Create] Repository Create',
    props<{ repo: RepoInterface }>()
);