import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    MatCardModule,
    MatListModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
