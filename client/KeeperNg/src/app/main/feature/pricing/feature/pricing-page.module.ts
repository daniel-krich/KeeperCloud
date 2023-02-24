import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingPageComponent } from './pricing-page.component';
import { PricingPageRoutingModule } from './pricing-page-routing.module';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    PricingPageComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    FadeInContentModule,
    MatCardModule,
    MatButtonModule,
    PricingPageRoutingModule
  ]
})
export class PricingPageModule { }
