import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFileDisplayComponent } from './table-file-display.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ContextMenuModule } from 'src/app/shared/ui/context-menu/context-menu.module';
import { ConvertByteSizeToStringModule } from 'src/app/shared/pipes/convert-byte-size-to-string/convert-byte-size-to-string.module';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    TableFileDisplayComponent
  ],
  imports: [
    CommonModule,
    ContextMenuModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ConvertByteSizeToStringModule,
    ScrollingModule,
    MatMenuModule
  ],
  exports: [TableFileDisplayComponent]
})
export class TableFileDisplayModule { }
