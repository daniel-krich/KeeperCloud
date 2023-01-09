import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { RepositoryStateInterface } from "../interfaces/repository-state.interface";
import { loadRepoBatchSuccess, loadRepoBatchError, loadRepoBatchNext, loadRepoBatchInit, createRepo } from './repository.actions';


const initState: RepositoryStateInterface = {
    repositories: [],
    disableAdditionalBatchLoading: false,
    error: '',
    stateStatus: 'pending'
};

export const repositoryReducer = createReducer(
    initState,

    on(loadRepoBatchInit, (state) => ({
        ...state,
        repositories: [],
        disableAdditionalBatchLoading: false,
        error: '',
        stateStatus: 'loading'
    })),

    on(loadRepoBatchNext, (state) => ({
        ...state,
        stateStatus: 'loading'
    })),

    on(loadRepoBatchSuccess, (state, { batch }) => ({
        ...state,
        
        repositories: state.repositories.concat(batch.batch)
                                        .filter((item, index, self) => 
                                            self.findIndex(t => t.id === item.id) === index
                                        ),
        disableAdditionalBatchLoading: !batch.isThereMoreBatch,
        stateStatus: 'success'
    })),

    on(loadRepoBatchError, (state) => ({
        ...state,
        stateStatus: 'error'
    })),

    on(createRepo, (state, { repo }) => ({
        ...state,
        repositories: [...state.repositories, repo]
    })),
);