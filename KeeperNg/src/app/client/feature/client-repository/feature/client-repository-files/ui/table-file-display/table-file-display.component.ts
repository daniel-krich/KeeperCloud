import { Component, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
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
    @ViewChild('dragSelectionContainer') public dragSelectionContainerRef!: ElementRef<HTMLDivElement>;

    @ViewChildren('fileRows') public fileRows!: QueryList<HTMLTableRowElement>;
    
    displayedColumns: string[] = ['name', 'size', 'dateModified'];

    @Input() files!: RepoFileInterface[];

    @Output() filesDownload: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() filesDelete: EventEmitter<string[]> = new EventEmitter<string[]>();

    private startX: number = 0;
    private startY: number = 0;
    private isSelecting: boolean = false;

    public itemList = ['Download', 'Delete'];
    public contextMenuPosition = { x: 0, y: 0 };
    public contextMenuVisible = false;

    public onContextMenuItemClick(item: string): void {
        let selectedFilesIds: string[] = [];
        this.files.forEach((file) => {
            const element = window.document.querySelector('#file-' + file.id) as HTMLTableRowElement;
            if(element.classList.contains('row-selected')) {
                selectedFilesIds.push(file.id);
            }
        });
        switch(item){
            case 'Download': {
                this.downloadFiles(selectedFilesIds);
                break;
            }
            case 'Delete': {
                this.deleteFiles(selectedFilesIds);
                break;
            }
            default: break;
        }
    }

    public openContextMenu(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'contextmenu') {
            this.contextMenuVisible = !this.contextMenuVisible;

            const baseRect = this.dragSelectionAreaRef.nativeElement.getBoundingClientRect();

            this.contextMenuPosition = { x: event.clientX - baseRect.left, y: event.clientY - baseRect.top };
        }
    }

    public downloadFiles(fileIds: string[]): void {
        this.filesDownload.emit(fileIds);
    }

    public deleteFiles(fileIds: string[]): void {
        this.filesDelete.emit(fileIds);
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
            if(!this.dragSelectionContainerRef.nativeElement.contains(event.target as Node)) {
                this.files.forEach((file) => {
                    const element = window.document.querySelector('#file-' + file.id) as HTMLTableRowElement;
                    element.classList.remove('row-selected');
                });
                this.contextMenuVisible = false;
            }
        }
        else if(this.dragSelectionContainerRef.nativeElement.contains(event.target as Node)) {
            this.contextMenuVisible = false;
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
