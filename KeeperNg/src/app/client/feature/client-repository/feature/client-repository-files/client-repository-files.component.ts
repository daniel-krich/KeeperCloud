import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap, throwIfEmpty, withLatestFrom } from 'rxjs';
import { RepositoryDataService } from 'src/app/client/data-access/repository-data.service';
import { RepositoryFilesDataService } from 'src/app/client/data-access/repository-files-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { loadRepoFilesBatchInit, loadRepoFilesBatchNext } from 'src/app/shared/data-access/state/repositories-files/repositories-files.actions';
import { selectRepoFilesByObservableId, selectRepoFilesInterfaceByObservableId } from 'src/app/shared/data-access/state/repositories-files/repositories-files.selectors';
import { loadRepoStart } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoByObservableId } from 'src/app/shared/data-access/state/repository/repository.selectors';

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
        throwIfEmpty(),
        switchMap(repoId => this.store.pipe(selectRepoByObservableId(repoId)))
    );

    public repositoryFiles$ = this.repoId$.pipe(
        switchMap(repoId => this.store.pipe(selectRepoFilesByObservableId(repoId)))
    );

    public repoFileBatchInfo$ = this.repoId$.pipe(
        throwIfEmpty(),
        switchMap(repoId => this.store.pipe(selectRepoFilesInterfaceByObservableId(repoId))),
        map(x => ({ canLoadMore: !x?.disableAdditionalBatchLoading, HowMuchLeft: x?.batchRemainder}))
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

    onFilesChangeUpload(files: File[]): void {
        console.log(files);
        
    }

    
    onRepoIdChanges(repositoryId: string | null): void {

        if(repositoryId) {
            this.store.dispatch(loadRepoStart({ repositoryId: repositoryId }));
        }
        
    }

    onDownloadFiles(fileIds: string[], repositoryId: string): void {
        console.log(fileIds);

        this.fileRepoService.downloadRepositoryFiles(repositoryId, fileIds).subscribe(x => {
            
            const url = window.URL.createObjectURL(x);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'group.zip';
            a.click();
            window.URL.revokeObjectURL(url);
        });
        
    }

    onDeleteFiles(fileIds: string[], repositoryId: string): void {
        console.log(fileIds);
    }

    onLoadMoreFiles(repositoryId: string): void {
        this.store.dispatch(loadRepoFilesBatchNext({repositoryId: repositoryId}));
    }

    onSearchSubmit(search: string): void {
        console.log(search);
    }
    

    ngOnDestroy(): void {
        this.routerParamsSubscribe.unsubscribe();
    }
}