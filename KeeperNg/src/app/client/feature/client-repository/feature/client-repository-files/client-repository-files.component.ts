import { Component, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, concatMap, filter, first, map, Observable, Subscription, switchMap, tap, throwIfEmpty, withLatestFrom } from 'rxjs';
import { RepositoryDataService } from 'src/app/client/data-access/repository-data.service';
import { RepositoryFilesDataService } from 'src/app/client/data-access/repository-files-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { downloadBegin, uploadBegin } from 'src/app/shared/data-access/state/file-transfer/file-transfer.actions';
import { deleteRepoFilesBegin, loadRepoFilesBatchInit, loadRepoFilesBatchNext } from 'src/app/shared/data-access/state/repositories-files/repositories-files.actions';
import { selectRepoFilesDescById, selectRepoFilesInterfaceByObservableId, selectRepoFileStateId } from 'src/app/shared/data-access/state/repositories-files/repositories-files.selectors';
import { deleteRepositoryBegin, updateRepositoryBegin } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoById } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { RepoFileInterface } from 'src/app/shared/interfaces/repo-file.interface';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';
import { ConfirmDialogComponent } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.model';
import { RepositoryModel } from './model/repository.model';
import { RepositoryDeleteDialogComponent } from './ui/repository-delete-dialog/repository-delete-dialog.component';
import { RepositoryEditDialogComponent } from './ui/repository-edit-dialog/repository-edit-dialog.component';
import { SearchFileInputComponent } from './ui/search-file-input/search-file-input.component';

@Component({
    selector: 'app-client-repository-files',
    templateUrl: './client-repository-files.component.html',
    styleUrls: ['./client-repository-files.component.scss'],
    host: { 'class': 'flex-spacer' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientRepositoryFilesComponent {

    @ViewChild('searchFileInput') searchFileInput?: SearchFileInputComponent;

    public searchFilter$ = new BehaviorSubject<string>('');

    public repoId$: Observable<string | null> = this.route.paramMap.pipe(
        map(x => x.get('repositoryId')),
        tap(_ => {
            this.searchFilter$.next('');
            this.searchFileInput?.changeSearchValue('');
        }) // reset search filter on repoId change.
    );

    public repository$ = this.repoId$.pipe(
        switchMap(repoId =>
            this.store.select(selectRepoById(repoId)).pipe(
                filter(x => x !== null),
                //first()
            )
        )
    );

    public repositoryFiles$ = combineLatest([this.repoId$, this.searchFilter$]).pipe(
        switchMap(([repoId, searchFilter]) =>
            this.store.pipe(
                selectRepoFilesDescById(repoId),
                map((repoFiles) => repoFiles.filter(x => x.name.toLowerCase().includes(searchFilter)))
            )
        ),
    );

    public repositoryFileState$ = this.repository$.pipe(
        switchMap(repo => this.store.select(selectRepoFileStateId(repo?.id ?? "")))
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

    constructor(private route: ActivatedRoute,
        private router: Router,
        private repoService: RepositoryDataService,
        private fileRepoService: RepositoryFilesDataService,
        private dialog: MatDialog,
        private store: Store<AppStateInterface>) { }

    onFilesChangeUpload(files: File[], repositoryId: string): void {
        this.store.dispatch(uploadBegin({ repositoryId: repositoryId, files: [...files] }))
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

        dialogRef.afterClosed().subscribe(isOk => {
            if (isOk) {
                this.store.dispatch(updateRepositoryBegin({ repositoryId: repo.id, repositoryUpdate: { name: repoModel.name, description: repoModel.description } }));
            }

        });
    }

    onRepoRemove(repo: RepoInterface) {
        const dialogRef = this.dialog.open(RepositoryDeleteDialogComponent, {
            maxWidth: "400px",
            data: repo.name
        });

        dialogRef.afterClosed().subscribe((isOk: boolean) => {
            if (isOk) {
                this.store.dispatch(deleteRepositoryBegin({ repository: repo }));
            }
        });
    }

    onDownloadFiles(files: RepoFileInterface[], repositoryId: string): void {
        if (files.length > 0) {
            this.store.dispatch(downloadBegin({ repositoryId: repositoryId, files: files }));
        }
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
        this.searchFilter$.next(search.toLowerCase());
    }

}