import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RepositoryDeleteDialogComponent } from './repository-delete-dialog.component';



@NgModule({
  declarations: [
    RepositoryDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [RepositoryDeleteDialogComponent, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule]
})
export class RepositoryDeleteDialogModule { }
