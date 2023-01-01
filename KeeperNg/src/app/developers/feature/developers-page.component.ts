import { Component } from '@angular/core';

@Component({
  selector: 'app-developers-page',
  templateUrl: './developers-page.component.html',
  styleUrls: ['./developers-page.component.scss']
})
export class DevelopersPageComponent {
    public codeSnippet: string = `
    const apiKey = 'YOUR_API_KEY';
    const file = document.getElementById('fileInput').files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('apiKey', apiKey);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.keepercloud.com/upload');
    xhr.send(formData);
    `;
}
