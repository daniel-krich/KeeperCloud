import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [ContextMenuComponent]
})
export class ContextMenuModule { }
