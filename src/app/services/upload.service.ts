import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private token;

  constructor() { }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token !==  'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
    return new Promise(function(resolve, reject) {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for ( let i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4) {
          if ( xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }

        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', this.token);
      xhr.send(formData);
    });

  }


}
