import { createSelector, select } from "@ngrx/store";
import { map, Observable, of, pairwise, pipe, skipWhile, switchMap, takeWhile, tap, throwError, throwIfEmpty, withLatestFrom } from "rxjs";
import { RepoFileInterface } from "src/app/shared/interfaces/repo-file.interface";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";
import { AppStateInterface } from "../app.state";


const sortByDesc = (repoFileA: RepoFileInterface, repoFileB: RepoFileInterface) => {
    const dateA = new Date(repoFileA.createdDate).getTime();
    const dateB = new Date(repoFileB.createdDate).getTime();
    return dateB - dateA;
};

const sortByAsc = (repoFileA: RepoFileInterface, repoFileB: RepoFileInterface) => {
    const dateA = new Date(repoFileA.createdDate).getTime();
    const dateB = new Date(repoFileB.createdDate).getTime();
    return dateA - dateB;
};

const selectRepoFileState = (state: AppStateInterface) => state.repositoriesFiles;

export const selectReposKeyFile = createSelector(
    selectRepoFileState,
    e => ({ ...e.filesByRepositoryKeys })
);

export const selectRepoFilesDescByObservableId = (repoId: string | null) => pipe(
    select(selectReposKeyFile),
    map(repo => repoId ? (repo[repoId]?.files?.slice().sort(sortByDesc) ?? []) : [])
);

export const selectRepoFileStateObservableId = (repoId: string | null) => pipe(
    select(selectReposKeyFile),
    map(repo => repoId ? (repo[repoId]) : null)
);

export const selectRepoFilesInterfaceByObservableId = (repoId: string | null) => pipe(
    select(selectReposKeyFile),
    map(repo => repoId ? repo[repoId] : null)
);