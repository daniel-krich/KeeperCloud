import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { NavigationDataService } from 'src/app/shared/data-access/navigation-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { unauthenticate } from 'src/app/shared/data-access/state/authentication/authentication.actions';
import { selectAuthUser } from 'src/app/shared/data-access/state/authentication/authentication.selectors';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
  animations: [
    trigger('expand', [
      state('collapsed', style({ visibility: 'hidden', height: '0' })),
      transition('collapsed => expanded', [
        style({ visibility: 'hidden', height: '0' }),
        animate('150ms ease-out', style({ visibility: 'visible', height: '*' }))
      ]),
      transition('expanded => collapsed', [
        style({ visibility: 'visible', height: '*' }),
        animate('150ms ease-in', style({ visibility: 'hidden', height: '0' }))
      ])
    ])
  ]
})
export class MobileNavComponent {

    public authUser$ = this.store.select(selectAuthUser);
    
    public menuState: 'collapsed' | 'expanded' = 'collapsed';

    public accountMenuState: boolean = false;

    constructor(public navData: NavigationDataService,
                private store: Store<AppStateInterface>,
                private snackBar: MatSnackBar) { }

    public toggleResponsiveMenu(): void {
        this.menuState = this.menuState == 'collapsed' ? 'expanded' : 'collapsed';
    }

    public get menuBoolState() {
        return this.menuState == 'expanded' ? true : false;
    }


    public logout(): void {
        this.store.dispatch(unauthenticate());

        this.snackBar.open('Logged out...', '', {
            duration: 2000,
            panelClass: ['primary-snackbar']
        });
    }
}
