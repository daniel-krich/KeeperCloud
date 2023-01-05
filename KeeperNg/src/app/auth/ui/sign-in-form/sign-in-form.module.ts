import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInFormComponent } from './sign-in-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    SignInFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [SignInFormComponent]
})
export class SignInFormModule { }