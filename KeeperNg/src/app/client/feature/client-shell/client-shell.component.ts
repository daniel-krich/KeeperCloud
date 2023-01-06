import { Component } from "@angular/core";

@Component({
    template: `
        <app-client-layout-with-nav>
        <router-outlet></router-outlet>
        </app-client-layout-with-nav>
    `
})
export class ClientShellComponent {

}