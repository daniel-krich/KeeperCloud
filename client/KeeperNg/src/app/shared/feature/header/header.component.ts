import { ChangeDetectionStrategy, Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
