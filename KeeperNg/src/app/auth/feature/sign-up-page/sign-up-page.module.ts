import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpPageRoutingModule } from './sign-up-page-routing.module';
import { SignUpPageComponent } from './sign-up-page.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';


@NgModule({
  declarations: [
    SignUpPageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    SignUpPageRoutingModule
  ]
})
export class SignUpPageModule { }
