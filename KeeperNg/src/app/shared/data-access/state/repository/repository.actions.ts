import { createAction, props } from "@ngrx/store";
import { CreateRepositoryModel } from "src/app/client/feature/client-layout-with-nav/models/create-repository.model";
import { BatchWrapperInterface } from "src/app/shared/interfaces/batch-wrapper.interface";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";
import { UpdateRepositoryDTOInterface } from "src/app/shared/interfaces/update-repository-dto.interface";

export const loadRepoStart = createAction(
    '[Repository Load] Repository Load Start',
    props<{ repositoryId: string }>()
);

export const loadRepoSuccess = createAction(
    '[Repository Load] Repository Load Success',
    props<{ repositoryId: string, repository: RepoInterface }>()
);

export const loadRepoSuccessEmpty = createAction(
    '[Repository Load] Repository Load Success But Empty',
    props<{ repositoryId: string }>()
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

//

export const createRepositoryBegin = createAction(
    '[Repository Create] Repository Create Begin',
    props<{ repository: CreateRepositoryModel }>()
);

export const createRepositorySuccess = createAction(
    '[Repository Create] Repository Create Success',
    props<{ repository: RepoInterface }>()
);

export const createRepositoryError = createAction(
    '[Repository Create] Repository Create Error'
);

//

export const deleteRepositoryBegin = createAction(
    '[Repository Delete] Repository Delete Begin',
    props<{ repository: RepoInterface }>()
);

export const deleteRepositorySuccess = createAction(
    '[Repository Delete] Repository Delete Success',
    props<{ repositoryId: string }>()
);

export const deleteRepositoryError = createAction(
    '[Repository Delete] Repository Delete Error'
);

//

export const updateRepositoryBegin = createAction(
    '[Repository Update] Repository Delete Begin',
    props<{ repositoryId: string, repositoryUpdate: UpdateRepositoryDTOInterface }>()
);

export const updateRepositorySuccess = createAction(
    '[Repository Update] Repository Update Success',
    props<{ repositoryId: string, repositoryUpdate: UpdateRepositoryDTOInterface }>()
);

export const updateRepositoryError = createAction(
    '[Repository Update] Repository Update Error'
);