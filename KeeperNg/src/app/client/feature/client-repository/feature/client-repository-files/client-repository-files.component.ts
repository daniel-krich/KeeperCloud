import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap, withLatestFrom } from 'rxjs';
import { RepositoryDataService } from 'src/app/client/data-access/repository-data.service';
import { RepositoryFilesDataService } from 'src/app/client/data-access/repository-files-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { loadRepoFilesBatchInit } from 'src/app/shared/data-access/state/repositories-files/repositories-files.actions';
import { selectRepoFilesByObservableId } from 'src/app/shared/data-access/state/repositories-files/repositories-files.selectors';
import { loadRepoStart } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoByObservableId } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { RepoFileInterface } from 'src/app/shared/interfaces/repo-file.interface';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-client-repository-files',
  templateUrl: './client-repository-files.component.html',
  styleUrls: ['./client-repository-files.component.scss']
})
export class ClientRepositoryFilesComponent implements OnDestroy {

    public repoId$: Observable<string | null> = this.route.paramMap.pipe(
        map(x => x.get('repositoryId'))
    );

    public repository$ = this.repoId$.pipe(
        switchMap(repoId => this.store.pipe(selectRepoByObservableId(repoId)))
    );

    public repositoryFiles$ = this.repoId$.pipe(
        switchMap(repoId => this.store.pipe(selectRepoFilesByObservableId(repoId)))
    );

    public repositoryPairedId$ = this.repository$.pipe(
        withLatestFrom(this.repoId$),
        map(([repository, repositoryId]) => ({repository, repositoryId}))
    );

    private routerParamsSubscribe: Subscription;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private repoService: RepositoryDataService,
                private fileRepoService: RepositoryFilesDataService,
                private store: Store<AppStateInterface>) {
        this.routerParamsSubscribe = this.repoId$.subscribe(repoId => this.onRepoIdChanges(repoId));
    }

    
    onRepoIdChanges(repositoryId: string | null): void {

        if(repositoryId) {
            this.store.dispatch(loadRepoStart({ repositoryId: repositoryId }));
            this.store.dispatch(loadRepoFilesBatchInit({ repositoryId: repositoryId }));
        }
        
    }
    

    ngOnDestroy(): void {
        this.routerParamsSubscribe.unsubscribe();
    }
}