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
import { ClientSidenavRepositoriesModule } from './ui/client-sidenav-repositories/client-sidenav-repositories.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogRepoCreateModule } from './feature/dialog-repo-create/dialog-repo-create.module';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ClientLayoutWithNavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    DialogRepoCreateModule
  ],
  exports: [ClientLayoutWithNavComponent]
})
export class ClientLayoutWithNavModule { }
