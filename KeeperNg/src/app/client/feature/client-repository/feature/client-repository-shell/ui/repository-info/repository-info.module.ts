import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryInfoComponent } from './repository-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConvertByteSizeToStringModule } from 'src/app/shared/pipes/convert-byte-size-to-string/convert-byte-size-to-string.module';



@NgModule({
  declarations: [
    RepositoryInfoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ConvertByteSizeToStringModule
  ],
  exports: [RepositoryInfoComponent]
})
export class RepositoryInfoModule { }
