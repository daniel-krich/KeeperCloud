import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { NavigationDataService } from 'src/app/shared/data-access/navigation-data.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { signoutBegin } from 'src/app/shared/data-access/state/authentication/authentication.actions';
import { selectAuthUser } from 'src/app/shared/data-access/state/authentication/authentication.selectors';
import { createRepositoryBegin } from 'src/app/shared/data-access/state/repository/repository.actions';
import { RepositoryDataService } from '../../data-access/repository-data.service';
import { DialogRepoCreateComponent } from './feature/dialog-repo-create/dialog-repo-create.component';
import { CreateRepositoryModel } from './models/create-repository.model';

@Component({
  selector: 'app-client-layout-with-nav',
  templateUrl: './client-layout-with-nav.component.html',
  styleUrls: ['./client-layout-with-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutWithNavComponent implements OnInit, OnDestroy {

    public user$ = this.store.select(selectAuthUser).pipe(map(x => x.user));

    constructor(public navigationData: NavigationDataService,
                private repoService: RepositoryDataService,
                private dialog: MatDialog,
                private router: Router,
                private store: Store<AppStateInterface>,
                private snackBar: MatSnackBar) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }


    
}
