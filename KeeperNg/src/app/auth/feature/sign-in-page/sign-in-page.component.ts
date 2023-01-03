import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SigninInterface } from '../../interfaces/sign-in.interface';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

    constructor(private snackbar: MatSnackBar) { }

    public onSigninSubmit(payload: SigninInterface | null): void {
        if(payload == null) {

            this.snackbar.open("There's some errors in that form...", '', {
                duration: 2000,
                panelClass: ['error-snackbar']
              });
        }
        else {
            console.log(payload);
            
        }
        
    }
}
