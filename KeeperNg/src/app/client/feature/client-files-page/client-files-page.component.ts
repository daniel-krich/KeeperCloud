import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-client-files-page',
  templateUrl: './client-files-page.component.html',
  styleUrls: ['./client-files-page.component.scss']
})
export class ClientFilesPageComponent {

    
    filesForm = new FormData();
    fileList: File[] = [];
    uploadProgress = 0;
    uploading = false;
    error = false;
    errorMessage = '';

    constructor(private httpClient: HttpClient) { }

    selectFiles(event: any) {
        
        this.fileList = event.target.files as File[];
        for (const file of this.fileList) {
            this.filesForm.append('files', file, file.name);
        }
      }

    uploadFiles() {
        this.uploading = true;
        this.httpClient.post('/api/file/upload?repositoryId=944FAD5E-8AE7-4E3E-969E-C4A3C5475036', this.filesForm, { reportProgress: true, observe: 'events' }).subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round((event.loaded * 100) / (event?.total ?? 0));
            } else if (event.type === HttpEventType.Response) {
              this.uploading = false;
              console.log(event.body);
            }
          },
          error: (error) => {
            this.error = true;
            this.errorMessage = error.message;
            this.uploading = false;
          }
        });
      }
}
