import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientMainPageRoutingModule } from './client-main-page-routing.module';
import { ClientMainPageComponent } from './client-main-page.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ClientMainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClientMainPageRoutingModule
  ]
})
export class ClientMainPageModule { }
