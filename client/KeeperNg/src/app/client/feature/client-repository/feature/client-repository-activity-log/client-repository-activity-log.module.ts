import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRepositoryActivityLogRoutingModule } from './client-repository-activity-log-routing.module';
import { ClientRepositoryActivityLogComponent } from './client-repository-activity-log.component';
import { ActivityLogTableModule } from './ui/activity-log-table/activity-log-table.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoadingCenteredModule } from 'src/app/shared/ui/loading-centered/loading-centered.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ClientRepositoryActivityLogComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    ActivityLogTableModule,
    FadeInContentModule,
    MatDividerModule,
    LoadingCenteredModule,
    ClientRepositoryActivityLogRoutingModule
  ]
})
export class ClientRepositoryActivityLogModule { }
