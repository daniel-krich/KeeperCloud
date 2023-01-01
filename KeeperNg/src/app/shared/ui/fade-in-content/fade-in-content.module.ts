import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInContentComponent } from './fade-in-content.component';

@NgModule({
  declarations: [
    FadeInContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [FadeInContentComponent]
})
export class FadeInContentModule { }
