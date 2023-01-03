import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingPageComponent } from './pricing-page.component';
import { PricingPageRoutingModule } from './pricing-page-routing.module';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';


@NgModule({
  declarations: [
    PricingPageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    PricingPageRoutingModule
  ]
})
export class PricingPageModule { }
