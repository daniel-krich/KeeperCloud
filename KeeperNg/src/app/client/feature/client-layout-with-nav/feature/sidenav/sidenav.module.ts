import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SidenavRepositoriesModule } from './feature/sidenav-repositories/sidenav-repositories.module';
import { DialogRepoCreateModule } from '../dialog-repo-create/dialog-repo-create.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    SidenavRepositoriesModule,
    DialogRepoCreateModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
