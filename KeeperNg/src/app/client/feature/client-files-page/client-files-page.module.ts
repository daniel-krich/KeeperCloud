import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientFilesPageRoutingModule } from './client-files-page-routing.module';
import { ClientFilesPageComponent } from './client-files-page.component';
import { ClientLayoutWithNavModule } from '../client-layout-with-nav/client-layout-with-nav.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    ClientFilesPageComponent
  ],
  imports: [
    CommonModule,
    ClientLayoutWithNavModule,
    FadeInContentModule,
    ClientFilesPageRoutingModule
  ]
})
export class ClientFilesPageModule { }
