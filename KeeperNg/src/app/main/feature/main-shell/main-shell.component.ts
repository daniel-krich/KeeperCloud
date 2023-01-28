import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <app-default-layout>
        <router-outlet></router-outlet>
        </app-default-layout>
    `
})
export class MainShellComponent {

}
