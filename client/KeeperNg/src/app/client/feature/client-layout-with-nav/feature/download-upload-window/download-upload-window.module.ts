import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadUploadWindowComponent } from './download-upload-window.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConfirmDialogModule } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.module';
import { ConvertByteSizeToStringModule } from 'src/app/shared/pipes/convert-byte-size-to-string/convert-byte-size-to-string.module';



@NgModule({
  declarations: [
    DownloadUploadWindowComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ConfirmDialogModule,
    ConvertByteSizeToStringModule

  ],
  exports: [DownloadUploadWindowComponent]
})
export class DownloadUploadWindowModule { }
