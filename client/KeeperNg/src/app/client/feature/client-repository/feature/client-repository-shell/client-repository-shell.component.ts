import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first, map, Observable, switchMap, tap } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { deleteRepositoryBegin, updateRepositoryBegin } from 'src/app/shared/data-access/state/repository/repository.actions';
import { selectRepoById } from 'src/app/shared/data-access/state/repository/repository.selectors';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';
import { RepositoryModel } from '../../model/repository.model';
import { RepositoryDeleteDialogComponent } from './ui/repository-delete-dialog/repository-delete-dialog.component';
import { RepositoryEditDialogComponent } from './ui/repository-edit-dialog/repository-edit-dialog.component';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .fix-height {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    `],
    template: `
        <div class="fix-height">
            <ng-container *ngIf="repository$ | async as repository">
                <app-repository-info [repository]="repository" (repositoryEditOpen)="onRepoEditOpen(repository)"
                (repositoryRemove)="onRepoRemove(repository)"></app-repository-info>

                <div class="d-flex bg-light">
                    <nav mat-tab-nav-bar [tabPanel]="tabPanel">
                        <a mat-tab-link 
                            *ngFor="let link of links"
                            [routerLink]="link.path"
                            routerLinkActive
                            [routerLinkActiveOptions]="{ exact: true }"
                            #linkActive="routerLinkActive"
                            [active]="linkActive.isActive">{{link.label}}</a>
                        <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
                    </nav>
                </div>

                <router-outlet></router-outlet>
            </ng-container>
        </div>
    `
})
export class ClientRepositoryShellComponent {

    links = [
        { path: './', label: 'Repository files' },
        { path: './manage-access', label: 'Manage access' },
        { path: './activity-log', label: 'Activity log' },
    ];

    public repoId$: Observable<string | null> = this.route.paramMap.pipe(
        map(x => x.get('repositoryId')),
    );

    public repository$ = this.repoId$.pipe(
        switchMap(repoId =>
            this.store.select(selectRepoById(repoId)).pipe(
                filter(x => x !== null)
            )
        )
    );

    constructor(private store: Store<AppStateInterface>, private dialog: MatDialog, private route: ActivatedRoute) { }

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
}