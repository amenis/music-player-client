import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Config } from '../services/config';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private token;
  private url;

  constructor(private http: Http) {
    this.url = Config.url;
    this.getToken();
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

  saveSong(song_to_save) {
    const params = JSON.stringify(song_to_save);
    console.log(params);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });
    return this.http.post(this.url + 'saveSong', params, {headers: headers}).pipe( map(res => res.json()) );
  }

  upadateSong() {

  }

  getAllSongs() {
    const headers = new Headers({'Content-type': 'application/json', 'Authorization': this.getToken() });
    return this.http.get(`${this.url}getAllSong`, {headers: headers}).pipe(map( res => res.json()));
  }

  deleteSong(idSong) {
    const headers = new Headers({'Content-type': 'application/json', 'Authorization': this.getToken() });
    return this.http.delete(`${this.url}song/${idSong}`, { headers: headers }).pipe( map ( res => res.json() ) );
  }


}
