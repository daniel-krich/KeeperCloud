import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload-input',
  templateUrl: './file-upload-input.component.html',
  styleUrls: ['./file-upload-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadInputComponent {

    @Output() public filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();

    onDragEnter(event: Event, uploadElement: HTMLLabelElement) {
        event.preventDefault();
        event.stopPropagation();
        uploadElement.classList.add('file-hover');
    }

    onDragOver(event: Event) {
        event.preventDefault();
        event.stopPropagation();
    }

    onDragLeave(event: Event, uploadElement: HTMLLabelElement) {
        event.preventDefault();
        event.stopPropagation();
        uploadElement.classList.remove('file-hover');
    }

    onDrop(event: any, uploadElement: HTMLLabelElement) {
        event.preventDefault();
        event.stopPropagation();
        uploadElement.classList.remove('file-hover');
        if(event.dataTransfer.files?.length > 0) {
            this.filesChange.emit(event.dataTransfer.files);
        }
    }
}
