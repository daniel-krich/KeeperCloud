import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPageRoutingModule } from './contact-page-routing.module';
import { ContactPageComponent } from './contact-page.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';


@NgModule({
  declarations: [
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    ContactPageRoutingModule
  ]
})
export class ContactPageModule { }
