import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientMainPageRoutingModule } from './client-main-page-routing.module';
import { ClientMainPageComponent } from './client-main-page.component';
import { RouterModule } from '@angular/router';
import { ClientLayoutWithNavModule } from '../client-layout-with-nav/client-layout-with-nav.module';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { FileDatabaseService } from '../../data-access/File-database.service';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    ClientMainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClientMainPageRoutingModule,
    MatTreeModule,
    FadeInContentModule,
    MatIconModule,
    NgChartsModule,
    MatCardModule,
    MatButtonModule,
    ClientLayoutWithNavModule
  ],
  providers: [FileDatabaseService]
})
export class ClientMainPageModule { }