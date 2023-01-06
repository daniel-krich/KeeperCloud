import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-main-page',
  templateUrl: './client-main-page.component.html',
  styleUrls: ['./client-main-page.component.scss'],
})
export class ClientMainPageComponent {
  datasets = [
    {
      data: [20, 50, 30],
      type: 'bar',
      label: 'File Operations',
      color: '#fff',
      backgroundColor: '#007bff',
    },
  ];
  labels = ['Access', 'Download', 'Upload'];
  options = {
  };
  legend = true;
  height = 200;
  width = 300;
}
