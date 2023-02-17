import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRepositoryFilesRoutingModule } from './client-repository-files-routing.module';
import { ClientRepositoryFilesComponent } from './client-repository-files.component';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';
import { SearchFileInputModule } from './ui/search-file-input/search-file-input.module';
import { TableFileDisplayModule } from './ui/table-file-display/table-file-display.module';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadInputModule } from 'src/app/shared/ui/file-upload-input/file-upload-input.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogModule } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.module';
import { LoadingCenteredModule } from 'src/app/shared/ui/loading-centered/loading-centered.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ClientRepositoryFilesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    FadeInContentModule,
    MatButtonModule,
    MatIconModule,
    LoadingCenteredModule,
    MatDividerModule,
    FileUploadInputModule,
    MatDialogModule,
    ConfirmDialogModule,
    SearchFileInputModule,
    TableFileDisplayModule,
    ClientRepositoryFilesRoutingModule
  ]
})
export class ClientRepositoryFilesModule { }
