import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByDatePipe } from './sort-by-date.pipe';



@NgModule({
  declarations: [
    SortByDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [SortByDatePipe]
})
export class SortByDateModule { }
