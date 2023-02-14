import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberApiTableComponent } from './member-api-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    MemberApiTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule
  ],
  exports: [MemberApiTableComponent]
})
export class MemberApiTableModule { }
