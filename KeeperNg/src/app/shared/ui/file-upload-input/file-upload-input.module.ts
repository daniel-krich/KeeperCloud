import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadInputComponent } from './file-upload-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FileUploadInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FileUploadInputComponent]
})
export class FileUploadInputModule { }
