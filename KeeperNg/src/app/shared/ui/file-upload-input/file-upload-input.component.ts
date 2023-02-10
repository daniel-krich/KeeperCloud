import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload-input',
  templateUrl: './file-upload-input.component.html',
  styleUrls: ['./file-upload-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadInputComponent implements OnInit, OnDestroy {

    @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

    @Input() public triggerUpload?: EventEmitter<void>;

    @Output() public filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();

    triggerSubscription?: Subscription;

    ngOnInit(): void {
        this.triggerSubscription = this.triggerUpload?.subscribe(() => this.onOutsideUploadTrigger());
    }
    
    onOutsideUploadTrigger() {
        this.fileInput?.nativeElement.click();
    }
    
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

    onChange(event: any) {
        event.preventDefault();
        event.stopPropagation();
        if(event.target.files?.length > 0) {
            this.filesChange.emit(event.target.files);
        }
    }

    ngOnDestroy(): void {
        this.triggerSubscription?.unsubscribe();
    }

}
