import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-loading-screen',
    templateUrl: './loading-screen.component.html',
    styleUrls: ['./loading-screen.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingScreenComponent {
    public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
