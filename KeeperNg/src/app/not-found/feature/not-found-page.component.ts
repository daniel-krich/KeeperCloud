import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit, OnDestroy {
    
    private intervalSubscription!: Subscription;

    public countDown: number = 5;

    constructor(private router: Router) { }

    ngOnInit(): void {
        const intervalSource = interval(1000);
        this.intervalSubscription = intervalSource.subscribe(_ => {
            if(--this.countDown <= 0) {
                this.router.navigateByUrl('/home');
            }
        });
    }


    ngOnDestroy(): void {
        this.intervalSubscription.unsubscribe();
    }

}