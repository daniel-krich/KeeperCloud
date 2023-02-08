import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/shared/guards/is-authenticated.guard';
import { RepositoryResolver } from '../../resolvers/repository.resolver';

const routes: Routes = [
    {
        path: ':repositoryId',
        loadChildren: () => import('../client-repository-files/client-repository-files.module').then(m => m.ClientRepositoryFilesModule),
        canActivate: [IsAuthenticatedGuard],
        resolve: [RepositoryResolver]
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
