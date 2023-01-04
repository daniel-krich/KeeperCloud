import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, Event as NavigationEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval } from 'rxjs';
import { BASE_URL } from './app.module';
import { AuthLogicService } from './shared/data-access/auth-logic.service';
import { AppStateInterface } from './shared/data-access/state/app.state';
import { authenticate, changeAuthStateToError, changeAuthStateToLoading, signinBegin, unauthenticate } from './shared/data-access/state/authentication/authentication.actions';
import { LoadingScreenComponent } from './shared/ui/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    @ViewChild('loading') loading!: LoadingScreenComponent;
    constructor(store: Store<AppStateInterface>,
                private router: Router, httpclient: HttpClient, authLogin: AuthLogicService, @Inject(BASE_URL) url: string) {
                    //console.log(authLogin.jwtPayloadFromLocalStorage?.email);
        
        store.dispatch(signinBegin());
                    
        /*            httpclient.get<string>(url + '/api/auth/validate').subscribe()
        store.dispatch(changeAuthStateToLoading());
        //store.dispatch(changeAuthStateToError());
        //store.dispatch(authenticate({ email: 'danek228@gmail.com', password: '228228' }));
        setTimeout(() => {
            //store.dispatch(changeAuthStateToError());
            //store.dispatch(unauthenticate());
            store.dispatch(authenticate({ email: 'danek228@gmail.com', password: '228228' }));
        }, 1000);*/


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