import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopersPageRoutingModule } from './developers-page-routing.module';
import { DevelopersPageComponent } from './developers-page.component';
import { FooterModule } from 'src/app/shared/ui/footer/footer.module';
import { HeaderModule } from 'src/app/shared/feature/header/header.module';
import { CodeHighlighterModule } from 'src/app/shared/ui/code-highlighter/code-highlighter.module';
import { FadeInContentModule } from 'src/app/shared/ui/fade-in-content/fade-in-content.module';

@NgModule({
  declarations: [
    DevelopersPageComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    CodeHighlighterModule,
    FadeInContentModule,
    DevelopersPageRoutingModule
  ]
})
export class DevelopersPageModule { }
