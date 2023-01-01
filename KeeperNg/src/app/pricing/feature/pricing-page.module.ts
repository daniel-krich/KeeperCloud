import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterModule } from 'src/app/shared/ui/footer/footer.module';
import { HeaderModule } from 'src/app/shared/feature/header/header.module';
import { PricingPageComponent } from './pricing-page.component';
import { PricingPageRoutingModule } from './pricing-page-routing.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    PricingPageComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    FadeInContentModule,
    PricingPageRoutingModule
  ]
})
export class PricingPageModule { }
