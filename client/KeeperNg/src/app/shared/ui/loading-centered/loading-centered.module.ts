import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingCenteredComponent } from './loading-centered.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    LoadingCenteredComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [LoadingCenteredComponent]
})
export class LoadingCenteredModule { }
