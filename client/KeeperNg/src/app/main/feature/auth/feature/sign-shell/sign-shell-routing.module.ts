import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { IsGuestGuard } from 'src/app/shared/guards/is-guest.guard';


const routes: Route[] = [
    {
        path: 'sign-in',
        loadChildren: () => import('../sign-in-page/sign-in-page.module').then(m => m.SignInPageModule),
        canActivate: [IsGuestGuard],
        title: 'Sign-in'
    },
    {
        path: 'sign-up',
        loadChildren: () => import('../sign-up-page/sign-up-page.module').then(m => m.SignUpPageModule),
        canActivate: [IsGuestGuard],
        title: 'Sign-up'
    },
    {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignShellRoutingModule { }
