import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NavigationDataService } from 'src/app/shared/data-access/navigation-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { signoutBegin } from 'src/app/shared/data-access/state/authentication/authentication.actions';
import { selectAuthUser } from 'src/app/shared/data-access/state/authentication/authentication.selectors';
import { createRepositoryBegin } from 'src/app/shared/data-access/state/repository/repository.actions';
import { CreateRepositoryModel } from '../../models/create-repository.model';
import { DialogRepoCreateComponent } from '../dialog-repo-create/dialog-repo-create.component';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {

    public user$ = this.store.select(selectAuthUser).pipe(map(x => x.user));

    constructor(public navigationData: NavigationDataService,
        private dialog: MatDialog,
        private router: Router,
        private store: Store<AppStateInterface>,
        private snackBar: MatSnackBar) { }

    public openDialog(): void {
        const createRepoModel = new CreateRepositoryModel();
        const dialogRef = this.dialog.open(DialogRepoCreateComponent, {
            width: '100%',
            maxWidth: '500px',
            enterAnimationDuration: '300',
            exitAnimationDuration: '300',
            data: createRepoModel
        });

        dialogRef.afterClosed().subscribe((isOk: boolean) => {
            if (isOk) {
                this.store.dispatch(createRepositoryBegin({ repository: createRepoModel }));
            }
        });
    }

    logout(): void {
        this.store.dispatch(signoutBegin());
        this.router.navigate(['/home']);
        this.snackBar.open('Logged out...', '', {
            duration: 2000,
            panelClass: ['primary-snackbar']
        });
    }

}
