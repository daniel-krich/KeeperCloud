import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/feature/main-shell/main-shell.module').then(m => m.MainShellModule),
    },
    {
        path: 'client',
        loadChildren: () => import('./client/feature/client-shell/client-shell.module').then(m => m.ClientShellModule),
        canLoad: [IsAuthenticatedGuard]
    },
    { path: 'client-repository-shell', loadChildren: () => import('./client/feature/client-repository/feature/client-repository-shell/client-repository-shell.module').then(m => m.ClientRepositoryShellModule) },
    { path: 'client-repository-files', loadChildren: () => import('./client/feature/client-repository/feature/client-repository-files/client-repository-files.module').then(m => m.ClientRepositoryFilesModule) },
    { path: '**', loadChildren: () => import('./not-found/feature/not-found-page.module').then(m => m.NotFoundPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }