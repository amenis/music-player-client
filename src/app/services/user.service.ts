import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import { Config } from './config';
import { identity } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  identity;
  token;
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

  getIdentity() {
    // tslint:disable-next-line:no-shadowed-variable
    const identity = JSON.parse(localStorage.getItem('identity'));
    if ( identity !== 'undefined' ) {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token !==  'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return null;
  }
}
