import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertByteSizeToStringPipe } from './convert-byte-size-to-string.pipe';
import { ConvertFilesSizeToStringPipe } from './convert-files-size-to-string.pipe';
import { ConvertUploadFilesSizeToStringPipe } from './convert-upload-files-size-to-string.pipe';



@NgModule({
  declarations: [
    ConvertByteSizeToStringPipe,
    ConvertUploadFilesSizeToStringPipe,
    ConvertFilesSizeToStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConvertByteSizeToStringPipe,
    ConvertFilesSizeToStringPipe,
    ConvertUploadFilesSizeToStringPipe
  ]
})
export class ConvertByteSizeToStringModule { }