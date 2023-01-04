import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, NgForm } from '@angular/forms';
import { SigninInterface } from '../../interfaces/sign-in.interface';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {

    @Output() public signInFormSubmit: EventEmitter<SigninInterface | null> = new EventEmitter<SigninInterface | null>();

    onSubmit(form: NgForm, email: string, password: string) {
        if (form.valid) {
            this.signInFormSubmit.emit({
                email: email,
                password: password,
                remember: false
            });
        }
      }
}
