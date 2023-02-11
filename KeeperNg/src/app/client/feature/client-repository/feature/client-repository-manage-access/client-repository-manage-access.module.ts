import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRepositoryManageAccessRoutingModule } from './client-repository-manage-access-routing.module';
import { ClientRepositoryManageAccessComponent } from './client-repository-manage-access.component';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';
import { RouterModule } from '@angular/router';
import { MemberApiTableModule } from './ui/member-api-table/member-api-table.module';
import { LoadingCenteredModule } from 'src/app/shared/ui/loading-centered/loading-centered.module';


@NgModule({
  declarations: [
    ClientRepositoryManageAccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FadeInContentModule,
    LoadingCenteredModule,
    ClientRepositoryManageAccessRoutingModule,
    MemberApiTableModule,
  ]
})
export class ClientRepositoryManageAccessModule { }