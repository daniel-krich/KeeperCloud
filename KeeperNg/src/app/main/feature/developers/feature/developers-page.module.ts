import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopersPageRoutingModule } from './developers-page-routing.module';
import { DevelopersPageComponent } from './developers-page.component';
import { CodeHighlighterModule } from 'src/app/shared/ui/code-highlighter/code-highlighter.module';
import { DefaultLayoutModule } from 'src/app/shared/feature/default-layout/default-layout.module';
import { MatCardModule } from '@angular/material/card';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';

@NgModule({
  declarations: [
    DevelopersPageComponent
  ],
  imports: [
    CommonModule,
    CodeHighlighterModule,
    DefaultLayoutModule,
    FadeInContentModule,
    MatCardModule,
    DevelopersPageRoutingModule
  ]
})
export class DevelopersPageModule { }
