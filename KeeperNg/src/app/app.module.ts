import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authenticationReducer } from './shared/data-access/state/authentication/authentication.reducers';
import { LoadingScreenModule } from './shared/ui/loading-screen/loading-screen.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthBearerInterceptor } from './shared/interceptors/auth-bearer.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './shared/data-access/state/authentication/authentication.effects';
import { AuthRefresherInterceptor } from './shared/interceptors/auth-refresher.interceptor';
import { repositoryReducer } from './shared/data-access/state/repository/repository.reducers';
import { RepositoryEffects } from './shared/data-access/state/repository/repository.effects';
import { repositoryFilesReducer } from './shared/data-access/state/repositories-files/repositories-files.reducers';
import { RepositoryFilesEffects } from './shared/data-access/state/repositories-files/repositories-files.effects';
import { fileTransferReducer } from './shared/data-access/state/file-transfer/file-transfer.reducers';
import { FileTransferEffects } from './shared/data-access/state/file-transfer/file-transfer.effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const BASE_URL = new InjectionToken<string>('base_url');

const baseUrlValue = 'http://localhost:5202';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LoadingScreenModule,
        MatSnackBarModule,
        StoreModule.forRoot(
            {
                authentication: authenticationReducer,
                repositories: repositoryReducer,
                repositoriesFiles: repositoryFilesReducer,
                fileTransfer: fileTransferReducer
            }
        ),
        EffectsModule.forRoot([AuthenticationEffects, RepositoryEffects, RepositoryFilesEffects, FileTransferEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: false, // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        }),
    ],
    providers: [
        { provide: BASE_URL, useValue: baseUrlValue },
        { provide: HTTP_INTERCEPTORS, useClass: AuthBearerInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthRefresherInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }