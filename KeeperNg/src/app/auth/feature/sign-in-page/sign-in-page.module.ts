import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInPageRoutingModule } from './sign-in-page-routing.module';
import { SignInPageComponent } from './sign-in-page.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';
import { SignInFormModule } from '../../ui/sign-in-form/sign-in-form.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    SignInPageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    SignInFormModule,
    MatSnackBarModule,
    SignInPageRoutingModule
  ]
})
export class SignInPageModule { }
