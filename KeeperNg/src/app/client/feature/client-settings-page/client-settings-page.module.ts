import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSettingsPageRoutingModule } from './client-settings-page-routing.module';
import { ClientSettingsPageComponent } from './client-settings-page.component';


@NgModule({
  declarations: [
    ClientSettingsPageComponent
  ],
  imports: [
    CommonModule,
    ClientSettingsPageRoutingModule
  ]
})
export class ClientSettingsPageModule { }
