import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRepositoryActivityLogComponent } from './client-repository-activity-log.component';

const routes: Routes = [{ path: '', component: ClientRepositoryActivityLogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRepositoryActivityLogRoutingModule { }
