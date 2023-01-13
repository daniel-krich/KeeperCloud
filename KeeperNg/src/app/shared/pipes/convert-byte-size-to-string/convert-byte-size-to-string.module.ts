import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertByteSizeToStringPipe } from './convert-byte-size-to-string.pipe';



@NgModule({
  declarations: [
    ConvertByteSizeToStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConvertByteSizeToStringPipe
  ]
})
export class ConvertByteSizeToStringModule { }
