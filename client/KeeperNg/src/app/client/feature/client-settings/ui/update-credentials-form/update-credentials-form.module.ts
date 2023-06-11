import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateCredentialsFormComponent } from './update-credentials-form.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    UpdateCredentialsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgxSkeletonLoaderModule,
    MatButtonModule
  ],
  exports: [UpdateCredentialsFormComponent]
})
export class UpdateCredentialsFormModule { }
