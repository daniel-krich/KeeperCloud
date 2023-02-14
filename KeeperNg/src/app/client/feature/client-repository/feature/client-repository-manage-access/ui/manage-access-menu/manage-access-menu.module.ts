import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ManageAccessMenuComponent } from './manage-access-menu.component';



@NgModule({
  declarations: [
    ManageAccessMenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
  ],
  exports: [ManageAccessMenuComponent]
})
export class ManageAccessMenuModule { }
