import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPageRoutingModule } from './contact-page-routing.module';
import { ContactPageComponent } from './contact-page.component';
import { FooterModule } from 'src/app/shared/ui/footer/footer.module';
import { HeaderModule } from 'src/app/shared/feature/header/header.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    FadeInContentModule,
    ContactPageRoutingModule
  ]
})
export class ContactPageModule { }
