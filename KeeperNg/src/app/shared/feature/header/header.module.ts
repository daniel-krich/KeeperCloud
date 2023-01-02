import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NavigationDataService } from './data-access/navigation-data.service';
import { DesktopNavModule } from './feature/desktop-nav/desktop-nav.module';
import { MobileNavModule } from './feature/mobile-nav/mobile-nav.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    DesktopNavModule,
    MobileNavModule
  ],
  providers: [NavigationDataService],
  exports: [HeaderComponent]
})
export class HeaderModule { }
