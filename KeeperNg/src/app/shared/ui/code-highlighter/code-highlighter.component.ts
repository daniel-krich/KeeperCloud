import { Component, Input, OnInit } from '@angular/core';
import { highlight, languages } from 'prismjs';

@Component({
  selector: 'app-code-highlighter',
  templateUrl: './code-highlighter.component.html',
  styleUrls: ['./code-highlighter.component.scss']
})
export class CodeHighlighterComponent implements OnInit {
    @Input() public formatCode!: string;

    public formattedCode: string = '';

    constructor() { }

    ngOnInit(): void {
        
        this.formattedCode = highlight(this.formatCode, languages['javascript'], 'javascript');
    }
}
