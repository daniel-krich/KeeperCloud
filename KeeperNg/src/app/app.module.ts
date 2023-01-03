import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { authenticationReducer } from './shared/data-access/state/authentication/authentication.reducers';
import { LoadingScreenModule } from './shared/ui/loading-screen/loading-screen.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingScreenModule,
    StoreModule.forRoot({ authentication: authenticationReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }