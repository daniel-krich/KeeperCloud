import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

const routes: Route[] = [
    {
        'path': '',
        loadChildren: () => import('../client-files-page/client-files-page.module').then(m => m.ClientFilesPageModule),
        pathMatch: 'full'
    },
    {
        'path': 'settings',
        loadChildren: () => import('../client-settings-page/client-settings-page.module').then(m => m.ClientSettingsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientShellRoutingModule { }