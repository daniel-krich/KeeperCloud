import { createReducer, on } from "@ngrx/store";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";
import { RepositoriesFilesStateInterface, RepositoryFilesStateInterface } from "../interfaces/repository-files-state.interface";
import { appendRepoFiles, clearAllRepoFiles, deleteRepoFilesDone, loadRepoFilesBatchError, loadRepoFilesBatchInit, loadRepoFilesBatchNext, loadRepoFilesBatchSuccess, removeAllRepoFilesByRepoId } from "./repositories-files.actions";

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

    on(appendRepoFiles, (state, { repositoryId, files }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoState};
        repositoryFiles.files = [...files, ...repositoryFiles.files ?? []];
        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: repositoryFiles}
        });
    }),

    on(clearAllRepoFiles, (state) => ({
        ...initState
    })),

    on(deleteRepoFilesDone, (state, { repositoryId, fileIds }) => {
        const repositoryFiles = {...state.filesByRepositoryKeys[repositoryId] ?? initFileRepoState};
        const filesDict = repositoryFiles.files?.reduce((acc, curr) => { acc[curr.id] = curr; return acc; }, {} as { [id: string]: RepoFileInterface });
        if(filesDict != null) {
            fileIds.forEach(x => delete filesDict[x]);
        }
        return ({
            ...state,
            filesByRepositoryKeys: {...state.filesByRepositoryKeys, [repositoryId]: {...repositoryFiles, files: Object.values(filesDict ?? [])}}
        });
    }),

    on(removeAllRepoFilesByRepoId, (state, { repositoryId }) => {
        const repoKeys = {...state.filesByRepositoryKeys};
        delete repoKeys[repositoryId];
        return {
            ...state,
            filesByRepositoryKeys: repoKeys
        };
    })
);