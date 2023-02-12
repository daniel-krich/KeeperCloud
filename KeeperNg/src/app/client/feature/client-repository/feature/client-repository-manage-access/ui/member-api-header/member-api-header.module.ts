import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberApiHeaderComponent } from './member-api-header.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MemberApiHeaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [MemberApiHeaderComponent]
})
export class MemberApiHeaderModule { }
