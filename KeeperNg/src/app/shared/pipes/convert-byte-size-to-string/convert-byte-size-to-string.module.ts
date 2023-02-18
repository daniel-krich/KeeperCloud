import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertByteSizeToStringPipe } from './convert-byte-size-to-string.pipe';
import { ConvertFilesSizeToStringPipe } from './convert-files-size-to-string.pipe';
import { ConvertUploadFilesSizeToStringPipe } from './convert-upload-files-size-to-string.pipe';
import { ConvertRepoFilesSizeWithProgressToStringPipe } from './convert-repo-files-size-with-progress-to-string.pipe';
import { ConvertFilesSizeWithProgressToStringPipe } from './convert-files-size-with-progress-to-string.pipe';



@NgModule({
  declarations: [
    ConvertByteSizeToStringPipe,
    ConvertUploadFilesSizeToStringPipe,
    ConvertFilesSizeToStringPipe,
    ConvertRepoFilesSizeWithProgressToStringPipe,
    ConvertFilesSizeWithProgressToStringPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConvertByteSizeToStringPipe,
    ConvertFilesSizeToStringPipe,
    ConvertUploadFilesSizeToStringPipe,
    ConvertRepoFilesSizeWithProgressToStringPipe,
    ConvertFilesSizeWithProgressToStringPipe
  ]
})
export class ConvertByteSizeToStringModule { }