import { createSelector, select } from "@ngrx/store";
import { map, Observable, of, pairwise, pipe, skipWhile, switchMap, takeWhile, tap, throwError, throwIfEmpty, withLatestFrom } from "rxjs";
import { RepoInterface } from "src/app/shared/interfaces/repo.interface";
import { AppStateInterface } from "../app.state";

const selectRepoFileState = (state: AppStateInterface) => state.repositoriesFiles;

export const selectReposKeyFile = createSelector(
    selectRepoFileState,
    e => ({ ...e.filesByRepositoryKeys })
);

export const selectRepoFilesByObservableId = (repoId: string | null) => pipe(
    select(selectReposKeyFile),
    map(repo => repoId ? repo[repoId].files : []),
    throwIfEmpty(() => throwError(() => new Error('Repository id files key not found')))
);