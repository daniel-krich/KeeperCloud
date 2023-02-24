import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../../ui/footer/footer.module';
import { FadeInContentModule } from '../../ui/fade-in-content/fade-in-content.module';

@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    FadeInContentModule,
    HeaderModule,
    FooterModule
  ],
  exports: [DefaultLayoutComponent]
})
export class DefaultLayoutModule { }
