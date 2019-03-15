import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
    const parameters = JSON.stringify(song_to_save);
    console.log(song_to_save);
    const headers = new Headers({'Content-type': 'application/json', 'Authorization': this.getToken() });
    return this.http.post(`${this.url}saveSong`, parameters, {headers: headers}).pipe(map( res => res.json() ));
  }

  upadateSong() {

  }

  deleteSong(idSong) {
    const headers = new Headers({'Content-type': 'application/json', 'Authorization': this.getToken() });
    return this.http.delete(`${this.url}song/${idSong}`, { headers: headers }).pipe( map ( res => res.json() ) );
  }


}
