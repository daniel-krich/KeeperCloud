import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public smDeviceWidth: number = 900; 
    public links: { path: string, label: string }[] = [
        {
            path: '/home',
            label: 'Home'
        },
        {
            path: '/pricing',
            label: 'Pricing'
        },
        {
            path: '/developers',
            label: 'Developers'
        },
        {
            path: '/contact',
            label: 'Contact'
        },
    ];

    public toggleMenu: boolean = false;
    public innerWidth: number = window.innerWidth;

    constructor(public router: Router) { }

    @HostListener('window:resize', ['$event'])
    private onResize(event: any): void {
        this.innerWidth = window.innerWidth;
    }

    public toggleResponsiveMenu(): void {
        this.toggleMenu = !this.toggleMenu;
    }
}
