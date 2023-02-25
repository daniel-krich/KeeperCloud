import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { selectRepoById } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { PageWrapperInterface } from 'src/app/shared/interfaces/page-wrapper.interface';
import { ActivityLogService } from './data-access/activity-log.service';
import { RepositoryActivityInterface } from './interfaces/repository-activity.interface';

@Component({
    selector: 'app-client-repository-activity-log',
    templateUrl: './client-repository-activity-log.component.html',
    host: { 'class': 'flex-spacer' },
    styleUrls: ['./client-repository-activity-log.component.scss']
})
export class ClientRepositoryActivityLogComponent {
    
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

    public activityLogsPagination$: Observable<PageWrapperInterface<RepositoryActivityInterface>> = combineLatest([this.repoId$, this.currentPage$]).pipe(
        switchMap(([repositoryId, page]) => this.activityLog.getActivityLogPagination(repositoryId!, page))
    );


    constructor(private route: ActivatedRoute,
        private activityLog: ActivityLogService,
        private store: Store<AppStateInterface>,
        private dialog: MatDialog,
        private snackbar: MatSnackBar) { }

    public onPageChanged(pageEvent: PageEvent): void {
        this.currentPage$.next(pageEvent.pageIndex + 1);
    }
}