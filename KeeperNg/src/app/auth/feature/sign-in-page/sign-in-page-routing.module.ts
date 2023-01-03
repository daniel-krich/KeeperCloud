import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in-page.component';

const routes: Routes = [{ path: '', component: SignInPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInPageRoutingModule { }
