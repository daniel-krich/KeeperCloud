import { NgModule, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncButtonDirective } from './async-button.directive';



@NgModule({
  declarations: [
    AsyncButtonDirective
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [AsyncButtonDirective]
})
export class AsyncButtonModule { }
