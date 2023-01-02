import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval } from 'rxjs';
import { AppStateInterface } from './shared/data-access/state/app.state';
import { authenticate, changeAuthStateToError, changeAuthStateToLoading, unauthenticate } from './shared/data-access/state/authentication/authentication.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(store: Store<AppStateInterface>) {
        store.dispatch(changeAuthStateToLoading());
        //store.dispatch(changeAuthStateToError());
        setTimeout(() => {

            //store.dispatch(unauthenticate());
            store.dispatch(authenticate({ email: 'danek228@gmail.com', password: '228228' }));
        }, 500);
        
    }

}