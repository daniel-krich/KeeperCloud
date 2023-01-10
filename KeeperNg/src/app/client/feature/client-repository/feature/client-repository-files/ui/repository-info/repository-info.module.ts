import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryInfoComponent } from './repository-info.component';



@NgModule({
  declarations: [
    RepositoryInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [RepositoryInfoComponent]
})
export class RepositoryInfoModule { }
