import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/data-access/auth.service';
import { SignupModel } from '../../models/sign-up.model';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpPageComponent {
    constructor(private snackbar: MatSnackBar,
                private authService: AuthService,
                private router: Router) { }

    public onSigninSubmit(signUp: SignupModel): void {
        this.authService.signUp(signUp).subscribe({
            next: () => {
                this.router.navigate(['/auth']);
                this.snackbar.open("Successfully signed-up", 'Close', {
                    duration: 2000,
                    panelClass: ['success-snackbar']
                });
            },
            error: () => {
                this.snackbar.open("Error while signing-up, email already exists", 'Close', {
                    duration: 2000,
                    panelClass: ['error-snackbar']
                });
            }
        });
    }

    public onSignupRedirect(path: string): void {
        this.router.navigate([path]);
    }
}
