import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInContentComponent } from './fade-in-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FadeInContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FadeInContentComponent]
})
export class FadeInContentModule { }
