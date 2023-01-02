import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

    public static readonly MOBILE_DEVICE_WIDTH: number = 900;

    public currentInnerWidth: number = window.innerWidth;

    constructor(public router: Router) { }

    @HostListener('window:resize', ['$event'])
    private onResize(event: any): void {
        this.currentInnerWidth = window.innerWidth;
    }

    public get mobileDeviceWidth() : number {
        return HeaderComponent.MOBILE_DEVICE_WIDTH;
    }

    
}
