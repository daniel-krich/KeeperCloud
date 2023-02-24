import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: '[fadeInContent]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  animations: [
    trigger('fade', [
        transition('* => true', [
            animate(0, style({ opacity: 0 })),
            style({ opacity: 0 }),
            animate(500, style({ opacity: 1 }))
        ]),
        transition('true => false', [
            animate(0, style({ opacity: 0 })),
            style({ opacity: 0 }),
            animate(500, style({ opacity: 1 }))
        ])
    ])
  ]
})
export class FadeInContentComponent {
    @HostBinding('@fade') trigger: boolean = false;

    private stopListeningForRoute$: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute) {
        this.route.params.pipe(
            takeUntil(this.stopListeningForRoute$)
        ).subscribe(() => {
            this.trigger = !this.trigger;
        });
    }

    ngOnDestroy(): void {
        this.stopListeningForRoute$.next();
    }
}