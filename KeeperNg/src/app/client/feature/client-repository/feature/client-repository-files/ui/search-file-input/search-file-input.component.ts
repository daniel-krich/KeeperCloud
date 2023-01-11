import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-file-input',
  templateUrl: './search-file-input.component.html',
  styleUrls: ['./search-file-input.component.scss']
})
export class SearchFileInputComponent {

    @Output() public searchSubmit: EventEmitter<string> = new EventEmitter<string>();

    public onSearchSubmit(search: string): void {
        this.searchSubmit.emit(search);
    }

}
