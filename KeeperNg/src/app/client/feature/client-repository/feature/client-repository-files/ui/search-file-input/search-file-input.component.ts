import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-file-input',
  templateUrl: './search-file-input.component.html',
  styleUrls: ['./search-file-input.component.scss']
})
export class SearchFileInputComponent {
    public search?: string;
    @Output() public searchSubmit: EventEmitter<string> = new EventEmitter<string>();

    public changeSearchValue(search: string) {
        this.search = search;
    }
}