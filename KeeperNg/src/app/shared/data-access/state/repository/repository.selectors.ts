import { createSelector, select } from "@ngrx/store";
import { map, pipe, tap } from "rxjs";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";
import { AppStateInterface } from "../app.state";


const sortByDesc = (repoA: RepoInterface, repoB: RepoInterface) => {
    const dateA = new Date(repoA.createdDate).getTime();
    const dateB = new Date(repoB.createdDate).getTime();
    return dateB - dateA;
};

const sortByAsc = (repoA: RepoInterface, repoB: RepoInterface) => {
    const dateA = new Date(repoA.createdDate).getTime();
    const dateB = new Date(repoB.createdDate).getTime();
    return dateA - dateB;
};

const selectRepoState = (state: AppStateInterface) => state.repository;

export const selectRepos = createSelector(
    selectRepoState,
    e => ({ repositories: e.repositories, disableAdditionalBatchLoading: e.disableAdditionalBatchLoading })
);

export const selectRepoStateDesc = createSelector(
    selectRepoState,
    e => ({
        ...e,
        repositories: e.repositories.slice().sort(sortByDesc)
    })
);

export const selectReposArraySortByDescCreation = createSelector(
    selectRepoState,
    e => (e.repositories.slice().sort(sortByDesc))
);

export const selectRepoStateStatus = createSelector(
    selectRepoState,
    e => ({ stateStatus: e.stateStatus, error: e.error })
);