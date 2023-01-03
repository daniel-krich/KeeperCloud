import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientMainPageRoutingModule } from './client-main-page-routing.module';
import { ClientMainPageComponent } from './client-main-page.component';
import { RouterModule } from '@angular/router';
import { ClientLayoutWithNavModule } from '../client-layout-with-nav/client-layout-with-nav.module';


@NgModule({
  declarations: [
    ClientMainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClientMainPageRoutingModule,
    ClientLayoutWithNavModule
  ]
})
export class ClientMainPageModule { }
