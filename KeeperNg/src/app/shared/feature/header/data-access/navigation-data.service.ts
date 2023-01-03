import { Injectable } from '@angular/core';

@Injectable()
export class NavigationDataService {

    public menuTitle: string = 'KeeperCloud';

    public commonLinks: { path: string, icon: string, label: string }[] = [
        {
            path: '/home',
            icon: 'home',
            label: 'Home'
        },
        {
            path: '/pricing',
            icon: 'sell',
            label: 'Pricing'
        },
        {
            path: '/developers',
            icon: 'code',
            label: 'Developers'
        },
        {
            path: '/contact',
            icon: 'mail',
            label: 'Contact'
        },
    ];

    public clientLinks: { path: string, icon: string, label: string }[] = [
        {
            path: '/client',
            icon: 'person',
            label: 'Client Area'
        },
        {
            path: '/client/settings',
            icon: 'settings',
            label: 'Settings'
        }
    ];

    constructor() { }

}
