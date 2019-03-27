import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  token: any;
  url: string;

  constructor(private http: Http) {
    this.url = Config.url;
    this.token = this.getToken();
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

  // New Artist
  addArtist(artist_to_register) {
    const params = JSON.stringify(artist_to_register);
    const headers = new Headers({'Content-type': 'application/json', 'Authorization': this.getToken() });
    return this.http.post(`${this.url}artist`, params, {headers: headers}).pipe(map( res => res.json()));
  }

  // Get All Artist Register On The DataBase
  getArtistList(page) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getToken() });
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.url}showArtist/${page}`, options ).pipe(map( res => res.json() ));
  }

  // Get Artist Data
  getArtist(token, idArtist) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({headers: headers});
    return  this.http.get(`${this.url}artist/${idArtist}`, options ).pipe( map( res => res.json() ) ) ;
  }

  // Get All the Albums Register per Artist
  getArtistAlbums(token, idArtist) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': token });
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.url}getAlbums/${idArtist}`, options).pipe( map( res => res.json() ) );
  }

  artistEdit(idArtist, artist_to_edit) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getToken() });
    const params = JSON.stringify(artist_to_edit);
    return this.http.put(`${this.url}artist/${idArtist}`, params , {headers: headers} ).pipe( map( res => res.json() ) );
  }

  delArtist(idArtist) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.getToken() });
    return this.http.delete(`${this.url}artist/${idArtist}`, { headers: headers} ).pipe( map( res => res.json() )  );
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
      xhr.open('POST', `${this.url}uploadImagenArtist/${artistid}` , true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    } );
  }

}
