import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { AppStateInterface } from 'src/app/shared/data-access/state/app.state';
import { signinSuccess } from 'src/app/shared/data-access/state/authentication/authentication.actions';
import { SigninInterface } from '../../interfaces/sign-in.interface';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

    constructor(private snackbar: MatSnackBar,
                private authService: AuthService,
                private store: Store<AppStateInterface>,
                private router: Router
                ) { }

    public onSigninSubmit(payload: SigninInterface | null): void {
        if(payload == null) {

            this.snackbar.open("There's some errors in that form...", '', {
                duration: 2000,
                panelClass: ['error-snackbar']
              });
        }
        else {
            this.authService.authenticateViaCredentials(payload.email, payload.password).pipe(
                map(jwt => jwt ? this.authService.transformTokenToUser(jwt.token) : null)
            ).subscribe(user => {
                if(user) {
                    this.store.dispatch(signinSuccess({ user: user }));
                    this.router.navigate(['/client']);
                }
                
            });
            
        }
        
    }
}
