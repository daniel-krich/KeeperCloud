import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPageRoutingModule } from './contact-page-routing.module';
import { ContactPageComponent } from './contact-page.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DefaultLayoutModule,
    MatInputModule, 
    MatFormFieldModule,
    MatButtonModule,
    ContactPageRoutingModule
  ]
})
export class ContactPageModule { }
