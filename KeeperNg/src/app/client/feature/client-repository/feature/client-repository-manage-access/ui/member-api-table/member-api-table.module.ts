import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberApiTableComponent } from './member-api-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MemberApiTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  exports: [MemberApiTableComponent]
})
export class MemberApiTableModule { }
