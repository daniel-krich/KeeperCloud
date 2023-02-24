import { Directive, Input, ElementRef, Renderer2, } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';


@Directive({
    selector: '[appAsyncButton]'
})
export class AsyncButtonDirective {
    @Input() appAsyncButton!: [any, (...params: any[]) => Observable<any>, any[]?];

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        fromEvent(this.elementRef.nativeElement, 'click').pipe(
            tap(() => this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'true')),
            switchMap(() => {
                const [scope, buttonFunction, functionParams] = this.appAsyncButton;
                const localButtonFunction = buttonFunction.bind(scope);
                if(functionParams !== undefined)
                    return localButtonFunction(...functionParams);
                return localButtonFunction();
            }),
            takeUntil(fromEvent(this.elementRef.nativeElement, 'ngOnDestroy')),
        ).subscribe(
            () => {
                this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
            }
        );
    }
}