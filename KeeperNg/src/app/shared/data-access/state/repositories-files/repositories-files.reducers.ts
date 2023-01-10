import { createReducer, on } from "@ngrx/store";
import { RepositoriesFilesStateInterface, RepositoryFilesStateInterface } from "../interfaces/repository-files-state.interface";
import { loadRepoFilesBatchError, loadRepoFilesBatchInit, loadRepoFilesBatchNext, loadRepoFilesBatchSuccess } from "./repositories-files.actions";

const initState: RepositoriesFilesStateInterface = {
    filesByRepositoryKeys: {},
    error: '',
    stateStatus: 'pending'
};

const initFileRepoStateFactory = (): RepositoryFilesStateInterface => ({
    files: [],
    error: '',
    stateStatus: 'pending',
    disableAdditionalBatchLoading: false,
});

export const repositoryFilesReducer = createReducer(
    initState,

    on(loadRepoFilesBatchInit, (state, { repositoryId }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoStateFactory()};
        repositoryFiles.stateStatus = 'loading';

        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles }
        });
    }),

    on(loadRepoFilesBatchNext, (state, { repositoryId }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoStateFactory()};
        repositoryFiles.stateStatus = 'loading';
        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles}
        });
    }),

    on(loadRepoFilesBatchSuccess, (state, { repositoryId, repositoryFilesBatch }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoStateFactory()};
        repositoryFiles.files = repositoryFilesBatch.batch;
        repositoryFiles.stateStatus = 'success';
        repositoryFiles.disableAdditionalBatchLoading = !repositoryFilesBatch.isThereMoreBatch;
        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles}
        });
    }),

    on(loadRepoFilesBatchError, (state, { repositoryId, error }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoStateFactory()};
        repositoryFiles.stateStatus = 'error';
        repositoryFiles.error = error;
        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles}
        });
    })
);