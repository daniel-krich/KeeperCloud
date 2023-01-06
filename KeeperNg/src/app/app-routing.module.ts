import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/feature/main-shell/main-shell.module').then(m => m.MainShellModule),
    },
    {
        path: 'client',
        loadChildren: () => import('./client/feature/client-shell/client-shell.module').then(m => m.ClientShellModule),
    },

    { path: '**', loadChildren: () => import('./not-found/feature/not-found-page.module').then(m => m.NotFoundPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }