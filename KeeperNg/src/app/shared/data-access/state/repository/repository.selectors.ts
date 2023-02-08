import { createSelector, select } from "@ngrx/store";
import { map, Observable, of, pairwise, pipe, skipWhile, switchMap, takeWhile, tap, throwError, throwIfEmpty, withLatestFrom } from "rxjs";
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

const selectRepoState = (state: AppStateInterface) => state.repositories;

export const selectRepos = createSelector(
    selectRepoState,
    e => ({ repositories: e.repositories, disableAdditionalBatchLoading: e.disableAdditionalBatchLoading, loadedIndividuallyCount: e.loadedIndividuallyCount })
);

export const selectRepoById = (repoId: string | null) => createSelector(
    selectRepoState,
    repo => repo.repositories.find(x => x.id === repoId) ?? null
);

export const selectRepoByIdWithStatus = (repoId: string | null) => createSelector(
    selectRepoState,
    repo => ({ 
        repository: repo.repositories.find(x => x.id === repoId) ?? null,
        status: repo.stateStatus  
    })
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