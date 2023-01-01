import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlighterComponent } from './code-highlighter.component';


import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-scss';

@NgModule({
  declarations: [
    CodeHighlighterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CodeHighlighterComponent]
})
export class CodeHighlighterModule { }
