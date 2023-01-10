import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFileInputComponent } from './search-file-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    SearchFileInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [SearchFileInputComponent]
})
export class SearchFileInputModule { }
