import { Component, Input } from '@angular/core';
import { RepoFileInterface } from 'src/app/shared/interfaces/repo-file.interface';

@Component({
  selector: 'app-table-file-display',
  templateUrl: './table-file-display.component.html',
  styleUrls: ['./table-file-display.component.scss']
})
export class TableFileDisplayComponent {
    displayedColumns: string[] = ['name', 'size', 'dateModified', 'options'];
    @Input() files: RepoFileInterface[] = [];

    public fileOpen(file: RepoFileInterface): void {

    }

    public fileDownload(file: RepoFileInterface): void {

    }

    public fileDelete(file: RepoFileInterface): void {

    }
}
