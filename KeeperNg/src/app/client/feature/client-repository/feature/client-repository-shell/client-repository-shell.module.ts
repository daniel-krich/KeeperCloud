import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRepositoryShellRoutingModule } from './client-repository-shell-routing.module';
import { ClientRepositoryShellComponent } from './client-repository-shell.component';
import { RepositoryDeleteDialogModule } from './ui/repository-delete-dialog/repository-delete-dialog.module';
import { RepositoryEditDialogModule } from './ui/repository-edit-dialog/repository-edit-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RepositoryInfoModule } from './ui/repository-info/repository-info.module';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        ClientRepositoryShellComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        ClientRepositoryShellRoutingModule,
        RepositoryDeleteDialogModule,
        RepositoryEditDialogModule,
        RepositoryInfoModule,
        MatTabsModule,
        MatDialogModule,
    ],
})
export class ClientRepositoryShellModule { }