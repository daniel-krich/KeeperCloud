import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRepositoryFilesComponent } from './client-repository-files.component';

const routes: Routes = [{ path: '', component: ClientRepositoryFilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRepositoryFilesRoutingModule { }
