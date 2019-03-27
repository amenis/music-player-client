import { Injectable } from '@angular/core';
import { Config } from './config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private token: string;
  private url: any;
  constructor(private http: Http, ) {
    this.token = this.getToken();
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

  newAlbum(album) {
    const params = JSON.stringify(album);
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getToken() });
    return this.http.post(`${this.url}saveAlbum`, params,  {headers: headers} ).pipe( map( res => res.json() ) );
  }

  editAlbum(album_to_edit) {
    const params = JSON.stringify(album_to_edit);
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getToken() });
    return this.http.put(`${this.url}album/${album_to_edit._id}`, params, {headers: headers}).pipe(map(  res => res.json() ));
  }

  deleteAlbum(idAlbum) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getToken() });
    return this.http.delete(`${this.url}album/${idAlbum}`, {headers: headers}).pipe(map(  res => res.json() ));
  }

  getAlbums(idAlbum) {
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getToken() });
    const options = new RequestOptions({headers: headers});
    return this.http.get(`${this.url}getAlbum/${idAlbum}`, options).pipe( map( res => res.json() ) );
  }

  albulmDetails(idAlbum) {
    const headers = new Headers({'Content-type': 'application/json', 'Authorization': this.getToken() });
    return this.http.get(`${this.url}getAllSong/${idAlbum}`, {headers: headers}).pipe(map( res => res.json()));
  }

}
