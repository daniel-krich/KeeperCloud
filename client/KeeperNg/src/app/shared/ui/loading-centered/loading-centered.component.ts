import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-centered',
  templateUrl: './loading-centered.component.html',
  styleUrls: ['./loading-centered.component.scss'],
  host: { 'class': 'h-100' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingCenteredComponent {

}
