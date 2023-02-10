import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRepositoryManageAccessComponent } from './client-repository-manage-access.component';

const routes: Routes = [{ path: '', component: ClientRepositoryManageAccessComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRepositoryManageAccessRoutingModule { }
