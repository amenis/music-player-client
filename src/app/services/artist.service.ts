import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  token;
  url: string;

  constructor(private http: Http) {
    this.url = Config.url;
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token !==  'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }


  addArtist(artist_to_register) {
    const params = JSON.stringify(artist_to_register);
    const headers = new Headers({'Content-type': 'application/json', 'Authorization': this.getToken() });
    return this.http.post(`${this.url}artist`, params, {headers: headers}).pipe(map( res => res.json()));
  }

  getArtistList() {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getToken() });
    return this.http.get(`${this.url}showArtist`, { headers: headers }).pipe(map( res => res.json() ));
  }

  makeFileRequest(artistid: string, params: Array<string>, files: Array<File>) {
    const token  = this.token;
    return new Promise( ( resolve, reject ) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          }
        } else {
          reject(xhr.response);
        }
      };
      xhr.open('POST', `${this.url}uploadImagenArtist/` , true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    } );
  }

}
