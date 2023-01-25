import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutWithNavComponent } from './client-layout-with-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientSidenavRepositoriesModule } from './feature/client-sidenav-repositories/client-sidenav-repositories.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogRepoCreateModule } from './feature/dialog-repo-create/dialog-repo-create.module';
import { MatInputModule } from '@angular/material/input';
import { SortByDateModule } from 'src/app/shared/pipes/sort-by-date/sort-by-date.module';
import { DownloadUploadWindowModule } from './feature/download-upload-window/download-upload-window.module';

@NgModule({
  declarations: [
    ClientLayoutWithNavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DownloadUploadWindowModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule,
    ClientSidenavRepositoriesModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatInputModule,
    SortByDateModule,
    DialogRepoCreateModule
  ],
  exports: [ClientLayoutWithNavComponent]
})
export class ClientLayoutWithNavModule { }
