import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { authenticationReducer } from './shared/data-access/state/authentication/authentication.reducers';
import { LoadingScreenModule } from './shared/ui/loading-screen/loading-screen.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from './shared/interceptors/with-credentials.interceptor';
import { AuthBearerInterceptor } from './shared/interceptors/auth-bearer.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './shared/data-access/state/authentication/authentication.effects';
import { AuthRefresherInterceptor } from './shared/interceptors/auth-refresher.interceptor';

export const BASE_URL = new InjectionToken<string>('base_url');

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
    StoreModule.forRoot({ authentication: authenticationReducer }),
    EffectsModule.forRoot([AuthenticationEffects])
  ],
  providers: [
        { provide: BASE_URL, useValue: 'http://localhost:5202' },
        { provide: HTTP_INTERCEPTORS, useClass: WithCredentialsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthBearerInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthRefresherInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }