import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpPageComponent } from './sign-up-page.component';

const routes: Routes = [{ path: '', component: SignUpPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpPageRoutingModule { }
