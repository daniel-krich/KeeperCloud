import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadUploadWindowComponent } from './download-upload-window.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    DownloadUploadWindowComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule

  ],
  exports: [DownloadUploadWindowComponent]
})
export class DownloadUploadWindowModule { }
