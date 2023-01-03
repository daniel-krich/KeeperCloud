import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileNavComponent } from './mobile-nav.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    MobileNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  exports: [MobileNavComponent]
})
export class MobileNavModule { }
