import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavRepositoriesComponent } from './sidenav-repositories.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidenavRepositoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    MatListModule
  ],
  exports: [
    SidenavRepositoriesComponent
  ]
})
export class SidenavRepositoriesModule { }
