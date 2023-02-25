import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogTableComponent } from './activity-log-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ActivityLogTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ActivityLogTableComponent]
})
export class ActivityLogTableModule { }
