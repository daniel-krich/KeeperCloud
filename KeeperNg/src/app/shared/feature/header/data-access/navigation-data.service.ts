import { Injectable } from '@angular/core';

@Injectable()
export class NavigationDataService {

    public menuTitle: string = 'KeeperCloud';

    public commonLinks: { path: string, label: string }[] = [
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

    constructor() { }

}
