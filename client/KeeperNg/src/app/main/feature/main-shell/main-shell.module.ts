import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainShellRoutingModule } from './main-shell-routing.module';
import { MainShellComponent } from './main-shell.component';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';


@NgModule({
  declarations: [
    MainShellComponent
  ],
  imports: [
    CommonModule,
    DefaultLayoutModule,
    MainShellRoutingModule
  ]
})
export class MainShellModule { }