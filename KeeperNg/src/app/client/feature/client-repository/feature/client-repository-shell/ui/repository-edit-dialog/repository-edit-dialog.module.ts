import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryEditDialogComponent } from './repository-edit-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    RepositoryEditDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [RepositoryEditDialogComponent, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule]
})
export class RepositoryEditDialogModule { }
