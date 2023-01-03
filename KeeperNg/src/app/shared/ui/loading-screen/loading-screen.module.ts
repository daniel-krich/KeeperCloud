import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from './loading-screen.component';



@NgModule({
  declarations: [
    LoadingScreenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [LoadingScreenComponent]
})
export class LoadingScreenModule { }
