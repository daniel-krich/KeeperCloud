import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { signinSuccess } from 'src/app/shared/data-access/state/authentication/authentication.actions';
import { SignInModel } from '../../models/sign-in.model';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInPageComponent {

    constructor(private snackbar: MatSnackBar,
                private authService: AuthService,
                private store: Store<AppStateInterface>,
                private router: Router
                ) { }

    public onSigninSubmit(signIn: SignInModel): void {
        this.authService.authenticateViaCredentials(signIn).pipe(
            map(jwt => this.authService.transformTokenToUser(jwt.token))
        ).subscribe({
            next: (user) => {
                if(user) {
                    this.store.dispatch(signinSuccess({ user: user }));
                    this.router.navigate(['/client']);
                }
            },
            error: () => {
                this.snackbar.open("Invalid email or password", 'Close', {
                    duration: 2000,
                    panelClass: ['error-snackbar']
                });
            }
        });
    }

    public onSigninRedirect(path: string): void {
        this.router.navigate([path]);
    }
}