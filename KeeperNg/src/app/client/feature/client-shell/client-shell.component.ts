import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/data-access/state/app.state";
import { clearFileTransfer } from "src/app/shared/data-access/state/file-transfer/file-transfer.actions";
import { clearAllRepoFiles } from "src/app/shared/data-access/state/repositories-files/repositories-files.actions";
import { loadRepoBatchInit } from "src/app/shared/data-access/state/repository/repository.actions";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-client-layout-with-nav>
        <router-outlet></router-outlet>
        </app-client-layout-with-nav>
    `
})
export class ClientShellComponent {

    constructor(store: Store<AppStateInterface>) {
        //store.dispatch(loadRepoBatchInit());
        //store.dispatch(clearAllRepoFiles());
        store.dispatch(clearFileTransfer());
    }

}