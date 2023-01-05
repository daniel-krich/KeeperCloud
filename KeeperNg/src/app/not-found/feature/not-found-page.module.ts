import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';
import { RouterModule } from '@angular/router';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DefaultLayoutModule,
    MatCardModule,
    NotFoundPageRoutingModule
  ]
})
export class NotFoundPageModule { }
