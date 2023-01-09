import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/shared/guards/is-authenticated.guard';

const routes: Routes = [
    {
        path: ':repositoryId',
        loadChildren: () => import('../client-repository-files/client-repository-files.module').then(m => m.ClientRepositoryFilesModule),
        canActivate: [IsAuthenticatedGuard]
    },
    {
        path: '',
        redirectTo: '/client',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRepositoryShellRoutingModule { }
