import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/data-access/state/app.state";
import { clearAllRepoFiles } from "src/app/shared/data-access/state/repositories-files/repositories-files.actions";
import { loadRepoBatchInit } from "src/app/shared/data-access/state/repository/repository.actions";

@Component({
    template: `
        <app-client-layout-with-nav>
        <router-outlet></router-outlet>
        </app-client-layout-with-nav>
    `
})
export class ClientShellComponent {

    constructor(store: Store<AppStateInterface>) {
        store.dispatch(loadRepoBatchInit());
        store.dispatch(clearAllRepoFiles());
    }

}