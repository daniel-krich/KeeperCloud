import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFileDisplayComponent } from './table-file-display.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TableFileDisplayComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [TableFileDisplayComponent]
})
export class TableFileDisplayModule { }
