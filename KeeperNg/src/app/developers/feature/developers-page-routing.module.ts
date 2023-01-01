import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevelopersPageComponent } from './developers-page.component';

const routes: Routes = [{ path: '', component: DevelopersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevelopersPageRoutingModule { }
