import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: '[fadeInContent]',
  template: `<ng-content></ng-content>`,
  animations: [
    trigger('fade', [
        transition('void => *', [
            style({ opacity: 0 }),
            animate(500, style({ opacity: 1 }))
        ])
    ])
  ]
})
export class FadeInContentComponent {
    @HostBinding('@fade') trigger: undefined;
}