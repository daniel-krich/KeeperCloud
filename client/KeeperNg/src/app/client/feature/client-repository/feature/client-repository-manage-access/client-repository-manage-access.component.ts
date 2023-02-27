import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, concat, filter, first, map, Observable, of, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { selectRepoById } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { MemberManageApiService } from './data-access/member-manage-api.service';
import { RepositoryMemberCreateDtoInterface } from './interfaces/repository-member-create-dto.interface';
import { RepositoryMemberInterface } from './interfaces/repository-member.interface';
import { RepositoryMemberModel } from './models/repository-member.model';
import { MemberHolderDialogComponent } from './ui/member-holder-dialog/member-holder-dialog.component';
import { MemberHolderDialogModel } from './ui/member-holder-dialog/member-holder-dialog.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { ConfirmDialogModel } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.model';
import { ConfirmDialogComponent } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.component';
import { toggleRepositoryAllowAnonymousFileReadBegin, toggleRepositoryAllowAnonymousFileReadSuccess } from 'src/app/shared/data-access/state/repository/repository.actions';
import { PageWrapperInterface } from 'src/app/shared/interfaces/page-wrapper.interface';
import { PageEvent } from '@angular/material/paginator';



const defaultPagination: PageWrapperInterface<RepositoryMemberInterface> = {
    currentPage: 0,
    itemsPerPage: 0,
    pageItems: [],
    pageItemsCount: 0,
    pagesCount: 0,
    totalItems: 0
};

@Component({
    selector: 'app-client-repository-manage-access',
    templateUrl: './client-repository-manage-access.component.html',
    styleUrls: ['./client-repository-manage-access.component.scss'],
    host: { 'class': 'flex-spacer' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientRepositoryManageAccessComponent {

    public repoId$: Observable<string | null> = this.route.parent!.parent!.paramMap.pipe(
        map(x => x.get('repositoryId')),
        filter(x => x !== null)
    );

    public repository$ = this.repoId$.pipe(
        switchMap(repoId =>
            this.store.select(selectRepoById(repoId)).pipe(
                filter(x => x !== null)
            )
        )
    );

    public currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    private repositoryApiMembersMemory$: BehaviorSubject<PageWrapperInterface<RepositoryMemberInterface>> = new BehaviorSubject<PageWrapperInterface<RepositoryMemberInterface>>(defaultPagination);

    private repositoryApiCallMembers$: Observable<PageWrapperInterface<RepositoryMemberInterface>> = combineLatest([this.repoId$, this.currentPage$]).pipe(
        switchMap(([repoId, page]) => this.memberManageApi.fetchPaginatedMembers(repoId!, page).pipe(
            tap(pagination => this.repositoryApiMembersMemory$.next(pagination))
        ))
    );

    public repositoryAllMembersMemoryWithApiCall$ = this.repositoryApiCallMembers$.pipe(
        switchMap(_ => this.repositoryApiMembersMemory$)
    );

    constructor(private route: ActivatedRoute,
        private store: Store<AppStateInterface>,
        private dialog: MatDialog,
        private clipboard: Clipboard,
        private snackbar: MatSnackBar,
        private memberManageApi: MemberManageApiService) { }

    public onClickAddApiMember(repositoryId: string): void {
        const memberHolderDialogModel: MemberHolderDialogModel = new MemberHolderDialogModel('Create');
        const memberModel = memberHolderDialogModel.repositoryMember;
        const dialogRef = this.dialog.open(MemberHolderDialogComponent, {
            data: memberHolderDialogModel,
            width: '100%',
            maxWidth: '500px',
            enterAnimationDuration: '300',
            exitAnimationDuration: '300',
        });

        dialogRef.afterClosed().pipe(
            withLatestFrom(this.repositoryApiMembersMemory$, this.currentPage$)
        ).subscribe(([isOk, repositoryPagination, page]) => {
            if (isOk) {
                this.memberManageApi.createMember(repositoryId, { name: memberModel.name, role: memberModel.role, permissionFlags: memberModel.permissionFlags }).subscribe({
                    next: (member) => {

                        if (page <= 1) {
                            this.repositoryApiMembersMemory$.next({
                                ...repositoryPagination,
                                pageItems: [member, ...repositoryPagination.pageItems],
                                totalItems: repositoryPagination.totalItems + 1,
                                pageItemsCount: repositoryPagination.pageItemsCount + 1
                            });
                        }

                        this.snackbar.open("Created Api member successfully", 'Close', {
                            duration: 2000,
                            panelClass: ['success-snackbar']
                        });
                    },
                    error: () => {
                        this.snackbar.open("Error while creating Api member.", 'Close', {
                            duration: 2000,
                            panelClass: ['error-snackbar']
                        });
                    }
                });
            }

        });
    }

    public onClickCopyApiToken(token: string): void {
        this.clipboard.copy(token);

        this.snackbar.open("Api token copied to clipboard", 'Close', {
            duration: 2000,
            panelClass: ['success-snackbar']
        });
    }

    public onUpdateApiMember(repositoryId: string, page: PageWrapperInterface<RepositoryMemberInterface>, memberId: string): void {
        const index = page.pageItems.findIndex(x => x.id === memberId);
        const memberModel = new RepositoryMemberModel(page.pageItems[index]);
        const memberHolderDialogModel: MemberHolderDialogModel = new MemberHolderDialogModel('Edit', memberModel);
        const dialogRef = this.dialog.open(MemberHolderDialogComponent, {
            data: memberHolderDialogModel,
            width: '100%',
            maxWidth: '500px',
            enterAnimationDuration: '300',
            exitAnimationDuration: '300',
        });

        dialogRef.afterClosed().subscribe(isOk => {
            if (isOk) {
                this.memberManageApi.updateMember(repositoryId, memberHolderDialogModel.repositoryMember.id, { name: memberModel.name, role: memberModel.role, permissionFlags: memberModel.permissionFlags }).subscribe({
                    next: (member) => {
                        const membersCopy = [...page.pageItems];
                        membersCopy[index] = { ...member };

                        this.repositoryApiMembersMemory$.next({ ...page, pageItems: membersCopy });

                        this.snackbar.open("Updated Api member successfully", 'Close', {
                            duration: 2000,
                            panelClass: ['success-snackbar']
                        });
                    },
                    error: () => {
                        this.snackbar.open("Error while updating Api member.", 'Close', {
                            duration: 2000,
                            panelClass: ['error-snackbar']
                        });
                    }
                });
            }

        });
    }

    public onToggleAllowAnonymousFileRead(repositoryId: string, toggle: boolean): void {
        if (toggle) {
            const dialogData = new ConfirmDialogModel('Repository open confirm', `
                Are you sure you want to open the repository for the public? this will enable anyone to access
                and download your files from this repository.
            `);

            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                maxWidth: "400px",
                data: dialogData
            });
            dialogRef.afterClosed().subscribe((isOk: boolean) => {
                if (isOk) {
                    this.store.dispatch(toggleRepositoryAllowAnonymousFileReadBegin({ repositoryId: repositoryId, toggle: toggle }));
                }
            });
        }
        else {
            this.store.dispatch(toggleRepositoryAllowAnonymousFileReadBegin({ repositoryId: repositoryId, toggle: toggle }));
        }
    }

    public onRemoveApiMember(repositoryId: string, page: PageWrapperInterface<RepositoryMemberInterface>, memberId: string): void {
        const memberRef = page.pageItems.find(x => x.id === memberId);
        const dialogData = new ConfirmDialogModel('Confirm Action', `
                Are you sure you want to remove member "${memberRef?.name}" which has a role of "${memberRef?.role}"?
            `);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe((isOk: boolean) => {
            if (isOk) {
                this.memberManageApi.deleteMember(repositoryId, memberId).subscribe({
                    next: () => {
                        this.repositoryApiMembersMemory$.next({
                            ...page,
                            pageItems: page.pageItems.filter(x => x.id !== memberId),
                            totalItems: page.totalItems - 1,
                            pageItemsCount: page.pageItemsCount - 1
                        });

                        this.snackbar.open("Deleted Api member successfully", 'Close', {
                            duration: 2000,
                            panelClass: ['success-snackbar']
                        });
                    },
                    error: () => {
                        this.snackbar.open("Error while deleting Api member.", 'Close', {
                            duration: 2000,
                            panelClass: ['error-snackbar']
                        });
                    }
                });
            }
        });
    }

    public onPageChanged(pageEvent: PageEvent): void {
        this.currentPage$.next(pageEvent.pageIndex + 1);
    }

}