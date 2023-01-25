import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, switchMap, throwIfEmpty, withLatestFrom } from 'rxjs';
import { RepositoryDataService } from 'src/app/client/data-access/repository-data.service';
import { RepositoryFilesDataService } from 'src/app/client/data-access/repository-files-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { downloadBegin, uploadBegin } from 'src/app/shared/data-access/state/file-transfer/file-transfer.actions';
import { selectDownloadsState } from 'src/app/shared/data-access/state/file-transfer/file-transfer.selectors';
import { deleteRepoFilesBegin, loadRepoFilesBatchInit, loadRepoFilesBatchNext } from 'src/app/shared/data-access/state/repositories-files/repositories-files.actions';
import { selectRepoFilesDescByObservableId, selectRepoFilesInterfaceByObservableId, selectRepoFileStateObservableId } from 'src/app/shared/data-access/state/repositories-files/repositories-files.selectors';
import { loadRepoStart } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoByObservableId } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { RepoFileInterface } from 'src/app/shared/interfaces/repo-file.interface';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';
import { ConfirmDialogComponent } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.model';
import { RepositoryModel } from './model/repository.model';
import { RepositoryEditDialogComponent } from './ui/repository-edit-dialog/repository-edit-dialog.component';

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
        switchMap(repoId => this.store.pipe(selectRepoFilesDescByObservableId(repoId)))
    );

    public repositoryFileState$ = this.repoId$.pipe(
        switchMap(repoId => this.store.pipe(selectRepoFileStateObservableId(repoId)))
    );

    public repoFileBatchInfo$ = this.repoId$.pipe(
        throwIfEmpty(),
        switchMap(repoId => this.store.pipe(selectRepoFilesInterfaceByObservableId(repoId))),
        map(x => ({ canLoadMore: !x?.disableAdditionalBatchLoading, HowMuchLeft: x?.batchRemainder }))
    );

    public repositoryPairedId$ = this.repository$.pipe(
        withLatestFrom(this.repoId$),
        map(([repository, repositoryId]) => ({ repository, repositoryId }))
    );

    private routerParamsSubscribe: Subscription;


    constructor(private route: ActivatedRoute,
        private router: Router,
        private repoService: RepositoryDataService,
        private fileRepoService: RepositoryFilesDataService,
        private dialog: MatDialog,
        private store: Store<AppStateInterface>) {
        this.routerParamsSubscribe = this.repoId$.subscribe(repoId => this.onRepoIdChanges(repoId));
    }

    onFilesChangeUpload(files: File[], repositoryId: string): void {
        this.store.dispatch(uploadBegin({ repositoryId: repositoryId, files: [...files] }))
    }


    onRepoIdChanges(repositoryId: string | null): void {
        if (repositoryId) {
            this.store.dispatch(loadRepoStart({ repositoryId: repositoryId }));
        }
    }

    onRepoEditOpen(repo: RepoInterface) {
        const repoModel = new RepositoryModel(repo);
        const dialogRef = this.dialog.open(RepositoryEditDialogComponent, {
            data: repoModel,
            width: '100%',
            maxWidth: '500px',
            enterAnimationDuration: '300',
            exitAnimationDuration: '300',
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(repoModel);
            
        });
    }

    onRepoRemove(repo: RepoInterface) {
        const dialogData = new ConfirmDialogModel('Confirm Action', `
                Are you sure you want to remove this repository? this will cause in permanent file deletion.
            `);

            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "400px",
                data: dialogData
            });

            dialogRef.afterClosed().subscribe((isOk: boolean) => {
                if (isOk) {
                    
                }
            });
    }

    onDownloadFiles(files: RepoFileInterface[], repositoryId: string): void {
        this.store.dispatch(downloadBegin({ repositoryId: repositoryId, files: files }));
    }

    onDeleteFiles(files: RepoFileInterface[], repositoryId: string): void {
        if (files.length > 0) {
            const dialogData = new ConfirmDialogModel('Confirm Action', `
                Are you sure you want to delete ${files.length} file(s)?
            `);

            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "400px",
                data: dialogData
            });

            dialogRef.afterClosed().subscribe((isOk: boolean) => {
                if (isOk) {
                    this.store.dispatch(deleteRepoFilesBegin({ repositoryId: repositoryId, files: files }));
                }
            });
        }
    }

    onLoadMoreFiles(repositoryId: string): void {
        this.store.dispatch(loadRepoFilesBatchNext({ repositoryId: repositoryId }));
    }

    onSearchSubmit(search: string): void {
        console.log(search);
    }


    ngOnDestroy(): void {
        this.routerParamsSubscribe.unsubscribe();
    }
}