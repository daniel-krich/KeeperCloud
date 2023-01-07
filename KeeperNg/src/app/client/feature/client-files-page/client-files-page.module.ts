import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientFilesPageRoutingModule } from './client-files-page-routing.module';
import { ClientFilesPageComponent } from './client-files-page.component';
import { ClientLayoutWithNavModule } from '../client-layout-with-nav/client-layout-with-nav.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ClientFilesPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    ClientLayoutWithNavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    DragDropModule,
    FadeInContentModule,
    ClientFilesPageRoutingModule
  ]
})
export class ClientFilesPageModule { }
