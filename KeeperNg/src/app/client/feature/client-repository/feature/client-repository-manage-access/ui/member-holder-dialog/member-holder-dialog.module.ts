import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MemberHolderDialogComponent } from './member-holder-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    MemberHolderDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule
  ],
  exports: [MemberHolderDialogComponent, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule]
})
export class MemberHolderDialogModule { }
