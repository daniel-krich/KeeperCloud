import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SigninInterface } from '../../interfaces/sign-in.interface';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {

    @Output() public signInFormSubmit: EventEmitter<SigninInterface | null> = new EventEmitter<SigninInterface | null>();
    signInForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.signInForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
            rememberMe: new FormControl(false)
          }, { validators: this.checkPasswords });
      }

      
    
      checkPasswords(form: AbstractControl) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { error: 'passwords are not the same' };
      }
    
      onSubmit() {
        if (this.signInForm.valid) {
            this.signInFormSubmit.emit({
                email: this.signInForm.controls['email']?.value,
                password: this.signInForm.controls['password']?.value,
                remember: this.signInForm.controls['rememberMe']?.value
            });
        }
        else {
            this.signInFormSubmit.emit(null);
        }
      }
}
