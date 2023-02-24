import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [ContextMenuComponent]
})
export class ContextMenuModule { }
