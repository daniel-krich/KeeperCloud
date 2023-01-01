import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientFilesPageRoutingModule } from './client-files-page-routing.module';
import { ClientFilesPageComponent } from './client-files-page.component';


@NgModule({
  declarations: [
    ClientFilesPageComponent
  ],
  imports: [
    CommonModule,
    ClientFilesPageRoutingModule
  ]
})
export class ClientFilesPageModule { }
