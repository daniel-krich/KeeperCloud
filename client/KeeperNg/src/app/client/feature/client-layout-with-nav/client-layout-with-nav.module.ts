import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavModule } from './feature/sidenav/sidenav.module';
import { ClientLayoutWithNavComponent } from './client-layout-with-nav.component';
import { DownloadUploadWindowModule } from './feature/download-upload-window/download-upload-window.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';

@NgModule({
  declarations: [
    ClientLayoutWithNavComponent
  ],
  imports: [
    CommonModule,
    DownloadUploadWindowModule,
    FadeInContentModule,
    SidenavModule
  ],
  exports: [ClientLayoutWithNavComponent]
})
export class ClientLayoutWithNavModule { }
