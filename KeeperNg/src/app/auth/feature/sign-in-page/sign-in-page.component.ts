import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthLogicService } from 'src/app/shared/data-access/auth-logic.service';
import { SigninInterface } from '../../interfaces/sign-in.interface';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

    constructor(private snackbar: MatSnackBar,
                private authService: AuthLogicService,
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
            this.authService.authenticateViaCredentials(payload.email, payload.password).subscribe(x => {
                this.router.navigate(['/client']);
            });
            
        }
        
    }
}
