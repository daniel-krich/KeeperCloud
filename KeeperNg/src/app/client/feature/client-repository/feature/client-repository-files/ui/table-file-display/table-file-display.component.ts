import { Component, ElementRef, HostListener, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { RepoFileInterface } from 'src/app/shared/interfaces/repo-file.interface';
import { RepoInterface } from 'src/app/shared/interfaces/repo.interface';

@Component({
  selector: 'app-table-file-display',
  templateUrl: './table-file-display.component.html',
  styleUrls: ['./table-file-display.component.scss']
})
export class TableFileDisplayComponent {

    @ViewChild('dragSelectionArea') public dragSelectionAreaRef!: ElementRef<HTMLDivElement>;
    @ViewChild('dragSelectionRectangle') public dragSelectionRectangleRef!: ElementRef<HTMLDivElement>;

    @ViewChildren('fileRows') public fileRows!: QueryList<HTMLTableRowElement>;
    
    displayedColumns: string[] = ['name', 'size', 'dateModified', 'options'];

    @Input() files!: RepoFileInterface[];

    private startX: number = 0;
    private startY: number = 0;
    private isSelecting: boolean = false;
    

    public fileOpen(file: RepoFileInterface): void {
    }

    public fileDownload(file: RepoFileInterface): void {

    }

    public fileDelete(file: RepoFileInterface): void {

    }

    startSelection(event: MouseEvent) {
        if(event.button !== 0) return;

        const baseRect = this.dragSelectionAreaRef.nativeElement.getBoundingClientRect();
        this.dragSelectionRectangleRef.nativeElement.classList.remove('hide-border');
        this.startX = event.clientX - baseRect.left;
        this.startY = event.clientY - baseRect.top;
        this.isSelecting = true;
        this.updateSelection(event);
    }

    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
        if(!this.dragSelectionAreaRef.nativeElement.contains(event.target as Node)) {
            this.files.forEach((file) => {
                const element = window.document.querySelector('#file-' + file.id) as HTMLTableRowElement;
                element.classList.remove('row-selected');
            });
        }
        
    }
    
    updateSelection(event: MouseEvent) {
        if (!this.isSelecting) {
          return;
        }
        
        const baseRect = this.dragSelectionAreaRef.nativeElement.getBoundingClientRect();

        const width = event.clientX - this.startX - baseRect.left;
        const height = event.clientY - this.startY - baseRect.top;

        const heightOffset = Math.abs(height);
        const widthOffset = Math.abs(width);
        
    
        // set the position and size of the drag selection area
        this.dragSelectionRectangleRef.nativeElement.style.top = `${height > 0 ? this.startY : this.startY - heightOffset}px`;
        this.dragSelectionRectangleRef.nativeElement.style.left = `${width > 0 ? this.startX : this.startX - widthOffset}px`;
        this.dragSelectionRectangleRef.nativeElement.style.width = `${widthOffset}px`;
        this.dragSelectionRectangleRef.nativeElement.style.height = `${heightOffset}px`;
    
        // check if any table rows are inside the drag selection area
        // and toggle their selected state accordingly
        this.files.forEach((file) => {
            const element = window.document.querySelector('#file-' + file.id) as HTMLTableRowElement;
            if(element && this.isRectanglesOverlap(element.getBoundingClientRect())) {
                element.classList.add('row-selected');
            }
            else {
                element.classList.remove('row-selected');
            }
            
        });
    }
    
    endSelection(event: MouseEvent) {
        this.isSelecting = false;
        this.dragSelectionRectangleRef.nativeElement.classList.add('hide-border');
        // hide the drag selection area
        this.dragSelectionRectangleRef.nativeElement.style.width = '0';
        this.dragSelectionRectangleRef.nativeElement.style.height = '0';
    }

    isRectanglesOverlap(rect: DOMRect): boolean {
        const selectionRect = this.dragSelectionRectangleRef.nativeElement.getBoundingClientRect();
        return (rect.left < selectionRect.right && rect.right > selectionRect.left &&
            rect.top < selectionRect.bottom && rect.bottom > selectionRect.top);
      }
}
