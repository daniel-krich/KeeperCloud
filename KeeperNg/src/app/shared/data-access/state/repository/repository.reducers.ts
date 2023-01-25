import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { RepositoryFilesStateInterface } from "../interfaces/repository-files-state.interface";
import { RepositoryStateInterface } from "../interfaces/repository-state.interface";
import { loadRepoBatchSuccess, loadRepoBatchError, loadRepoBatchNext, loadRepoBatchInit, createRepo, loadRepoSuccess, loadRepoStart, loadRepoError, loadRepoSuccessEmpty } from './repository.actions';


const initState: RepositoryStateInterface = {
    repositories: [],
    batchRemainder: 0,
    loadedIndividuallyCount: 0,
    disableAdditionalBatchLoading: false,
    error: '',
    stateStatus: 'pending'
};

export const repositoryReducer = createReducer(
    initState,

    on(loadRepoBatchInit, (state) => ({
        ...state,
        repositories: [],
        batchRemainder: 0,
        disableAdditionalBatchLoading: false,
        error: '',
        stateStatus: 'loading'
    })),

    on(loadRepoBatchNext, (state) => ({
        ...state,
        stateStatus: 'loading'
    })),

    on(loadRepoBatchSuccess, (state, { batch }) => {
        const updatedReposNoDuplicates = state.repositories.concat(batch.batch)
            .filter((item, index, self) =>
                self.findIndex(t => t.id === item.id) === index
            );
        const duplicateCount = (state.repositories.length + batch.batch.length) - updatedReposNoDuplicates.length;
        const realHowMuchLeft = batch.howMuchLeftCount - duplicateCount;
        const realIsThereMoreBatch = realHowMuchLeft > 0;
        return ({
            ...state,
            repositories: updatedReposNoDuplicates,
            batchRemainder: realHowMuchLeft,
            disableAdditionalBatchLoading: !realIsThereMoreBatch,
            stateStatus: 'success'
        });
    }),

    on(loadRepoBatchError, (state, { error }) => ({
        ...state,
        error: error,
        stateStatus: 'error'
    })),

    on(createRepo, (state, { repository }) => {
        return ({
            ...state,
            repositories: [...state.repositories, repository]
        });
    }),

    on(loadRepoStart, (state, { repositoryId }) => {
        return ({
            ...state,
            stateStatus: 'loading'
        });
    }),

    on(loadRepoSuccessEmpty, (state) => {
        return ({
            ...state,
            stateStatus: 'success'
        });
    }),

    on(loadRepoSuccess, (state, { repository }) => {
        const loadedIndividuallyCountUpdated = state.loadedIndividuallyCount + 1;
        return ({
            ...state,
            repositories: [...state.repositories.filter(x => x.id !== repository.id), repository],
            stateStatus: 'success',
            loadedIndividuallyCount: loadedIndividuallyCountUpdated,
            batchRemainder: state.batchRemainder - loadedIndividuallyCountUpdated,
            disableAdditionalBatchLoading: state.batchRemainder - loadedIndividuallyCountUpdated <= 0
        });
    }),

    on(loadRepoError, (state, { error }) => {
        return ({
            ...state,
            error: error,
            stateStatus: 'error'
        });
    }),
);