import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { RepositoriesInitResolver } from './shared/resolvers/repositories-init.resolver';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/feature/main-shell/main-shell.module').then(m => m.MainShellModule)
    },
    {
        path: 'client',
        loadChildren: () => import('./client/feature/client-shell/client-shell.module').then(m => m.ClientShellModule),
        canLoad: [IsAuthenticatedGuard],
        resolve: [RepositoriesInitResolver]
    },
    {
        path: '**',
        loadChildren: () => import('./not-found/feature/not-found-page.module').then(m => m.NotFoundPageModule),
        title: '404'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }