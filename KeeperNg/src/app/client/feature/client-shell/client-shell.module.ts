import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ClientShellRoutingModule } from "./client-shell-routing.module";
import { ClientShellComponent } from "./client-shell.component";
import { ClientLayoutWithNavModule } from "../client-layout-with-nav/client-layout-with-nav.module";

@NgModule({
    declarations: [ClientShellComponent],
    imports: [
        CommonModule,
        ClientShellRoutingModule,
        ClientLayoutWithNavModule
    ]
})
export class ClientShellModule { }