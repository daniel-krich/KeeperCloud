import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMainPageComponent } from './client-main-page.component';

const routes: Routes = [{ path: '', component: ClientMainPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientMainPageRoutingModule { }
