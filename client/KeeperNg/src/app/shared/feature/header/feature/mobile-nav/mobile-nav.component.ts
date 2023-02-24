import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { APP_NAME } from 'src/app/app.module';
import { NavigationDataService } from 'src/app/shared/data-access/navigation-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { signoutBegin } from 'src/app/shared/data-access/state/authentication/authentication.actions';
import { selectAuthUser } from 'src/app/shared/data-access/state/authentication/authentication.selectors';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class MobileNavComponent implements OnInit, OnDestroy {

    public authUser$ = this.store.select(selectAuthUser);
    
    public menuState: 'collapsed' | 'expanded' = 'collapsed';

    public accountMenuState: boolean = false;

    private routerSubscription!: Subscription;

    constructor(public navData: NavigationDataService,
                private store: Store<AppStateInterface>,
                private snackBar: MatSnackBar,
                private router: Router,
                @Inject(APP_NAME) public readonly appName: string) { }
    

    ngOnInit(): void {
        this.routerSubscription = this.router.events.subscribe((event: NavigationEvent) => {

            switch (true) {
                case event instanceof NavigationStart: {
                    this.menuState = 'collapsed';
                    break;
                }

                default: break;
            }
        });
    }

    ngOnDestroy(): void {
        this.routerSubscription.unsubscribe();
    }

    public toggleResponsiveMenu(): void {
        this.menuState = this.menuState == 'collapsed' ? 'expanded' : 'collapsed';
    }

    public get menuBoolState() {
        return this.menuState == 'expanded' ? true : false;
    }


    public logout(): void {
        this.store.dispatch(signoutBegin());

        this.snackBar.open('Logged out...', '', {
            duration: 2000,
            panelClass: ['primary-snackbar']
        });
    }
}
