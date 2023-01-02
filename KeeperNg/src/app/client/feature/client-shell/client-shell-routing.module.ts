import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const routes: Route[] = [
    {
        path: '',
        loadChildren: () => import('../client-main-page/client-main-page.module').then(m => m.ClientMainPageModule),
        pathMatch: 'full'
    },
    {
        path: 'files',
        loadChildren: () => import('../client-files-page/client-files-page.module').then(m => m.ClientFilesPageModule),
    },
    {
        path: 'settings',
        loadChildren: () => import('../client-settings-page/client-settings-page.module').then(m => m.ClientSettingsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientShellRoutingModule { }