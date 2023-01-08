import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../app.state";


const selectRepoState = (state: AppStateInterface) => state.repository;
export const selectRepos = createSelector(
    selectRepoState,
    e => ({ repositories: e.repositories, disableAdditionalBatchLoading: e.disableAdditionalBatchLoading })
);

export const selectRepoStateStatus = createSelector(
    selectRepoState,
    e => ({ stateStatus: e.stateStatus, error: e.error })
);