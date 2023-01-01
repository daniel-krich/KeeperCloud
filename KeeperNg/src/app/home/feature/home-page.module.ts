import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { FooterModule } from 'src/app/shared/ui/footer/footer.module';
import { HeaderModule } from 'src/app/shared/feature/header/header.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    FadeInContentModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
