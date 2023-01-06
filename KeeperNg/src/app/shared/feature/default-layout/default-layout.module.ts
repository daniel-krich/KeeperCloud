import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './default-layout.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../../ui/footer/footer.module';

@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule
  ],
  exports: [DefaultLayoutComponent]
})
export class DefaultLayoutModule { }
