import { Component } from '@angular/core';

@Component({
  selector: 'app-developers-page',
  templateUrl: './developers-page.component.html',
  styleUrls: ['./developers-page.component.scss']
})
export class DevelopersPageComponent {
    public codeSnippet: string = `
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const stream = require('stream');

const app = express();

// Parse incoming request bodies as a stream
app.use(bodyParser.raw({ type: 'application/octet-stream' }));

app.post('/upload', (req, res) => {
  // Get the API key
  const apiKey = 'YOUR_API_KEY';

  // Create a stream from the request body
  const requestStream = new stream.PassThrough();
  requestStream.end(req);

  // Send the file stream to the KeeperCloud API
  axios({
    method: 'post',
    url: 'https://api.keepercloud.com/v1/files',
    data: requestStream,
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
      'Content-Type': 'application/octet-stream'
    }
  }).then(apiResponse => {
    // Return the API response to the client
    res.send(apiResponse.data);
  }).catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
});`;
}
