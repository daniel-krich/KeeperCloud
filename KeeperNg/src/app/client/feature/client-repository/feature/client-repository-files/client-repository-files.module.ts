import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRepositoryFilesRoutingModule } from './client-repository-files-routing.module';
import { ClientRepositoryFilesComponent } from './client-repository-files.component';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    ClientRepositoryFilesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    ClientRepositoryFilesRoutingModule
  ]
})
export class ClientRepositoryFilesModule { }
