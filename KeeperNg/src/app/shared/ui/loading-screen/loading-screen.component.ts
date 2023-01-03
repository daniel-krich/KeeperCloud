import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent {
    public isLoading: boolean = false;
}
