import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import { Config } from './config';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private _http: Http) {
    this.url = Config.url;
  }

  singUp() {
  }

  login(user_to_login, getHash = null) {

    if ( getHash != null) {
      user_to_login.gethash = getHash;
    }
    const json = JSON.stringify(user_to_login);
    const params = json;
    const headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(`${this.url}login`, params, {headers: headers}).pipe(map( res => res.json() ));

  }
}
