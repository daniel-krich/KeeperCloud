import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSettingsPageComponent } from './client-settings-page.component';

const routes: Routes = [{ path: '', component: ClientSettingsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientSettingsPageRoutingModule { }
