import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/shared/guards/is-authenticated.guard';
import { RepositoryWithFilesResolver } from '../../resolvers/repository-with-files.resolver';
import { RepositoryResolver } from '../../resolvers/repository.resolver';
import { ClientRepositoryShellComponent } from './client-repository-shell.component';

const routes: Routes = [
    {
        path: ':repositoryId',
        component: ClientRepositoryShellComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../client-repository-files/client-repository-files.module').then(m => m.ClientRepositoryFilesModule),
                canActivate: [IsAuthenticatedGuard],
                resolve: [RepositoryWithFilesResolver],
                pathMatch: 'full'
            },
            {
                path: 'manage-access',
                loadChildren: () => import('../client-repository-manage-access/client-repository-manage-access.module').then(m => m.ClientRepositoryManageAccessModule),
                canActivate: [IsAuthenticatedGuard]
            }
        ],
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
