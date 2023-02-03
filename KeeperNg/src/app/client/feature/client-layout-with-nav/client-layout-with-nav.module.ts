import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutWithNavComponent } from './client-layout-with-nav.component';
import { DownloadUploadWindowModule } from './feature/download-upload-window/download-upload-window.module';
import { SidenavModule } from './feature/sidenav/sidenav.module';

@NgModule({
  declarations: [
    ClientLayoutWithNavComponent
  ],
  imports: [
    CommonModule,
    DownloadUploadWindowModule,
    SidenavModule
  ],
  exports: [ClientLayoutWithNavComponent]
})
export class ClientLayoutWithNavModule { }
