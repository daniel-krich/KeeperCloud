import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRepositoryManageAccessRoutingModule } from './client-repository-manage-access-routing.module';
import { ClientRepositoryManageAccessComponent } from './client-repository-manage-access.component';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';
import { RouterModule } from '@angular/router';
import { MemberApiTableModule } from './ui/member-api-table/member-api-table.module';
import { LoadingCenteredModule } from 'src/app/shared/ui/loading-centered/loading-centered.module';
import { MatDividerModule } from '@angular/material/divider';
import { MemberHolderDialogModule } from './ui/member-holder-dialog/member-holder-dialog.module';
import { ManageAccessMenuModule } from './ui/manage-access-menu/manage-access-menu.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogModule } from 'src/app/shared/ui/confirm-dialog/confirm-dialog.module';


@NgModule({
  declarations: [
    ClientRepositoryManageAccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FadeInContentModule,
    LoadingCenteredModule,
    ManageAccessMenuModule,
    MatSnackBarModule,
    ConfirmDialogModule,
    MemberHolderDialogModule,
    MatDividerModule,
    ClientRepositoryManageAccessRoutingModule,
    MemberApiTableModule,
  ]
})
export class ClientRepositoryManageAccessModule { }