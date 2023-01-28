import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { NavigationDataService } from 'src/app/shared/data-access/navigation-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { signoutBegin } from 'src/app/shared/data-access/state/authentication/authentication.actions';
import { selectAuthUser } from 'src/app/shared/data-access/state/authentication/authentication.selectors';

@Component({
  selector: 'app-desktop-nav',
  templateUrl: './desktop-nav.component.html',
  styleUrls: ['./desktop-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopNavComponent {

    public authUser$ = this.store.select(selectAuthUser);

    constructor(public navData: NavigationDataService,
                private store: Store<AppStateInterface>,
                private snackBar: MatSnackBar) { }

    public logout(): void {
        this.store.dispatch(signoutBegin());

        this.snackBar.open('Logged out...', '', {
            duration: 2000,
            panelClass: ['primary-snackbar']
          });
    }
    
}