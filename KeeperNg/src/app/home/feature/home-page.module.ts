import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
