import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberApiTableComponent } from './member-api-table.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    MemberApiTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [MemberApiTableComponent]
})
export class MemberApiTableModule { }
