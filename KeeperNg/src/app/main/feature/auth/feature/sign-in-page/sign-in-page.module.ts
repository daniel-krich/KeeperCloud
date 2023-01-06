import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInPageRoutingModule } from './sign-in-page-routing.module';
import { SignInPageComponent } from './sign-in-page.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';
import { SignInFormModule } from '../../ui/sign-in-form/sign-in-form.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    SignInPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DefaultLayoutModule,
    FadeInContentModule,
    SignInFormModule,
    MatSnackBarModule,
    SignInPageRoutingModule
  ]
})
export class SignInPageModule { }
