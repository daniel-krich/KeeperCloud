import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { IsAuthenticatedGuard } from "src/app/shared/guards/is-authenticated.guard";
import { ClientShellComponent } from "./client-shell.component";

const routes: Route[] = [
    {
        path: '',
        component: ClientShellComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../client-main-page/client-main-page.module').then(m => m.ClientMainPageModule),
                canActivate: [IsAuthenticatedGuard],
                pathMatch: 'full'
            },
            {
                path: 'repository',
                loadChildren: () => import('../client-repository/feature/client-repository-shell/client-repository-shell.module').then(m => m.ClientRepositoryShellModule),
                canActivate: [IsAuthenticatedGuard]
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
        ]
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientShellRoutingModule { }