import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientSidenavRepositoriesComponent } from './client-sidenav-repositories.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    ClientSidenavRepositoriesComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    MatListModule
  ],
  exports: [ClientSidenavRepositoriesComponent]
})
export class ClientSidenavRepositoriesModule { }
