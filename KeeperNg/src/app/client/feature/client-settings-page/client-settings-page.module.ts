import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSettingsPageRoutingModule } from './client-settings-page-routing.module';
import { ClientSettingsPageComponent } from './client-settings-page.component';
import { ClientLayoutWithNavModule } from '../client-layout-with-nav/client-layout-with-nav.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';


@NgModule({
  declarations: [
    ClientSettingsPageComponent
  ],
  imports: [
    CommonModule,
    ClientLayoutWithNavModule,
    FadeInContentModule,
    ClientSettingsPageRoutingModule
  ]
})
export class ClientSettingsPageModule { }
