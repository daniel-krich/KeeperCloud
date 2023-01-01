import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { 
        path: 'home',
        loadChildren: () => import('./home/feature/home-page.module').then(x => x.HomePageModule)
    },
    { 
        path: 'pricing',
        loadChildren: () => import('./pricing/feature/pricing-page.module').then(x => x.PricingPageModule)
    },
    { 
        path: 'developers',
        loadChildren: () => import('./developers/feature/developers-page.module').then(m => m.DevelopersPageModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('./contact/feature/contact-page.module').then(m => m.ContactPageModule)
    },
    {
        path: 'client',
        loadChildren: () => import('./client/feature/client-shell/client-shell.module').then(m => m.ClientShellModule)
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', loadChildren: () => import('./not-found/feature/not-found-page.module').then(m => m.NotFoundPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }