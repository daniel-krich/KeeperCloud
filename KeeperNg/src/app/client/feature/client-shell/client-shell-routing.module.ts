import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { IsAuthenticatedGuard } from "src/app/shared/guards/is-authenticated.guard";

const routes: Route[] = [
    {
        path: '',
        loadChildren: () => import('../client-main-page/client-main-page.module').then(m => m.ClientMainPageModule),
        canActivate: [IsAuthenticatedGuard],
        pathMatch: 'full'
    },
    {
        path: 'files',
        loadChildren: () => import('../client-files-page/client-files-page.module').then(m => m.ClientFilesPageModule),
        canActivate: [IsAuthenticatedGuard],
    },
    {
        path: 'settings',
        loadChildren: () => import('../client-settings-page/client-settings-page.module').then(m => m.ClientSettingsPageModule),
        canActivate: [IsAuthenticatedGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientShellRoutingModule { }