import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-file-input',
  templateUrl: './search-file-input.component.html',
  styleUrls: ['./search-file-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFileInputComponent {
    public search$: BehaviorSubject<string> = new BehaviorSubject('');
    @Output() public searchSubmit: EventEmitter<string> = new EventEmitter<string>();

    public changeSearchValue(search: string) {
        this.search$.next(search);
    }
}