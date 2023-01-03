import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutWithNavComponent } from './client-layout-with-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ClientLayoutWithNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule
  ],
  exports: [ClientLayoutWithNavComponent]
})
export class ClientLayoutWithNavModule { }
