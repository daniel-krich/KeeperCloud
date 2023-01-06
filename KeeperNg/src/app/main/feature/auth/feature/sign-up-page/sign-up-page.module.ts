import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpPageRoutingModule } from './sign-up-page-routing.module';
import { SignUpPageComponent } from './sign-up-page.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';
import { SignUpFormModule } from '../../ui/sign-up-form/sign-up-form.module';


@NgModule({
  declarations: [
    SignUpPageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    FadeInContentModule,
    SignUpFormModule,
    SignUpPageRoutingModule
  ]
})
export class SignUpPageModule { }
