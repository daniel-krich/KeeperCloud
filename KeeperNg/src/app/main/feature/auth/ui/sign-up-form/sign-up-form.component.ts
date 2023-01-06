import { Component, EventEmitter, Output } from '@angular/core';
import { SignupModel } from '../../models/sign-up.model';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {
    @Output() public signUpFormSubmit: EventEmitter<SignupModel> = new EventEmitter<SignupModel>();

    @Output() public redirectRequest: EventEmitter<string> = new EventEmitter<string>();

    public isLoading: boolean = false;

    public signUpForm:  SignupModel = new SignupModel();

    onSubmit() {
        this.signUpFormSubmit.emit(this.signUpForm);
    }

    signinRedirect(): void {
        this.redirectRequest.emit('/auth');
    }
}
