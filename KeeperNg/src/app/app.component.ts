import { Component, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { LoadingScreenComponent } from './shared/ui/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  template: `
    <app-loading-screen #loading></app-loading-screen>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

    @ViewChild('loading') loading!: LoadingScreenComponent;

    constructor(private router: Router) {
        this.router.events.subscribe((event: NavigationEvent) => {

            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading.isLoading = true;
                    break;
                }
      
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading.isLoading = false;
                    break;
                }

                default: break;
            }
        });
    }
}