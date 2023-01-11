import { createReducer, on } from "@ngrx/store";
import { RepositoriesFilesStateInterface, RepositoryFilesStateInterface } from "../interfaces/repository-files-state.interface";
import { clearAllRepoFiles, loadRepoFilesBatchError, loadRepoFilesBatchInit, loadRepoFilesBatchNext, loadRepoFilesBatchSuccess } from "./repositories-files.actions";

const initState: RepositoriesFilesStateInterface = {
    filesByRepositoryKeys: {},
    error: '',
    stateStatus: 'pending'
};

const initFileRepoState: RepositoryFilesStateInterface = {
    files: null,
    batchRemainder: 0,
    error: '',
    stateStatus: 'pending',
    disableAdditionalBatchLoading: false,
};

export const repositoryFilesReducer = createReducer(
    initState,

    on(loadRepoFilesBatchInit, (state, { repositoryId }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoState};
        repositoryFiles.stateStatus = 'loading';

        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles }
        });
    }),

    on(loadRepoFilesBatchNext, (state, { repositoryId }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoState};
        repositoryFiles.stateStatus = 'loading';
        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles}
        });
    }),

    on(loadRepoFilesBatchSuccess, (state, { repositoryId, repositoryFilesBatch }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoState};
        repositoryFiles.files = [...repositoryFiles.files ?? [], ...repositoryFilesBatch.batch];
        repositoryFiles.stateStatus = 'success';
        repositoryFiles.batchRemainder = repositoryFilesBatch.howMuchLeftCount;
        repositoryFiles.disableAdditionalBatchLoading = !repositoryFilesBatch.isThereMoreBatch;
        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles}
        });
    }),

    on(loadRepoFilesBatchError, (state, { repositoryId, error }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoState};
        repositoryFiles.stateStatus = 'error';
        repositoryFiles.error = error;
        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles}
        });
    }),

    on(clearAllRepoFiles, (state) => ({
        ...initState
    }))
);