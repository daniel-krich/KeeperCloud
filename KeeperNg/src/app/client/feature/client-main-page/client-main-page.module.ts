import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientMainPageRoutingModule } from './client-main-page-routing.module';
import { ClientMainPageComponent } from './client-main-page.component';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
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
    MatButtonModule
  ]
})
export class ClientMainPageModule { }