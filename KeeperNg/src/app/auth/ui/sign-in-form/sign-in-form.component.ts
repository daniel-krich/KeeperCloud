import { Component, EventEmitter, Output } from '@angular/core';
import { SignInModel } from '../../models/sign-in.model';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {

    @Output() public signInFormSubmit: EventEmitter<SignInModel> = new EventEmitter<SignInModel>();

    public isLoading: boolean = false;

    public signInForm:  SignInModel = new SignInModel();

    onSubmit() {
        this.signInFormSubmit.emit(this.signInForm);
    }
}