import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';
import { FooterModule } from 'src/app/shared/ui/footer/footer.module';
import { HeaderModule } from 'src/app/shared/feature/header/header.module';
import { RouterModule } from '@angular/router';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    RouterModule,
    HeaderModule,
    FadeInContentModule,
    NotFoundPageRoutingModule
  ]
})
export class NotFoundPageModule { }
