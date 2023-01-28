import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, map, Observable, startWith, withLatestFrom } from 'rxjs';

@Component({
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {

    private redirectCountDownRemainder: number = 6;

    public redirectCountDown$: Observable<number> = interval(1000).pipe(
        startWith(true),
        map(() => {
            if(--this.redirectCountDownRemainder <= 0) {
                this.router.navigateByUrl('/home');
            }
            return this.redirectCountDownRemainder;
        })
    );

    constructor(private router: Router) { }

}