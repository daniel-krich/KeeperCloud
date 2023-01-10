import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRepositoryFilesRoutingModule } from './client-repository-files-routing.module';
import { ClientRepositoryFilesComponent } from './client-repository-files.component';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';
import { RepositoryInfoModule } from './ui/repository-info/repository-info.module';
import { SearchFileInputModule } from './ui/search-file-input/search-file-input.module';
import { TableFileDisplayModule } from './ui/table-file-display/table-file-display.module';


@NgModule({
  declarations: [
    ClientRepositoryFilesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    FadeInContentModule,
    RepositoryInfoModule,
    SearchFileInputModule,
    TableFileDisplayModule,
    ClientRepositoryFilesRoutingModule
  ]
})
export class ClientRepositoryFilesModule { }
