import { Component } from '@angular/core';
import { NavigationDataService } from '../../data-access/navigation-data.service';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent {
    public toggleMenu: boolean = false;

    constructor(public navData: NavigationDataService) { }

    public toggleResponsiveMenu(): void {
        this.toggleMenu = !this.toggleMenu;
    }
}
