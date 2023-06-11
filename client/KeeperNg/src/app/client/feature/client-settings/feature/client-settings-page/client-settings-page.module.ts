import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientSettingsPageRoutingModule } from './client-settings-page-routing.module';
import { ClientSettingsPageComponent } from './client-settings-page.component';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';
import { UpdateCredentialsFormModule } from '../../ui/update-credentials-form/update-credentials-form.module';


@NgModule({
  declarations: [
    ClientSettingsPageComponent
  ],
  imports: [
    CommonModule,
    FadeInContentModule,
    ClientSettingsPageRoutingModule,
    UpdateCredentialsFormModule
  ]
})
export class ClientSettingsPageModule { }
