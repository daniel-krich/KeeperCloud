import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainShellComponent } from './main-shell.component';

const routes: Routes = [{
    path: '',
    component: MainShellComponent,
    children: [
        { 
            path: 'home',
            loadChildren: () => import('../home/feature/home-page.module').then(x => x.HomePageModule)
        },
        { 
            path: 'pricing',
            loadChildren: () => import('../pricing/feature/pricing-page.module').then(x => x.PricingPageModule)
        },
        { 
            path: 'developers',
            loadChildren: () => import('../developers/feature/developers-page.module').then(m => m.DevelopersPageModule)
        },
        {
            path: 'contact',
            loadChildren: () => import('../contact/feature/contact-page.module').then(m => m.ContactPageModule)
        },
        {
            path: 'auth',
            loadChildren: () => import('../auth/feature/sign-shell/sign-shell.module').then(m => m.SignShellModule)
        },
        
        { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainShellRoutingModule { }
