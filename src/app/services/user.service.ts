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

  register(user_to_register) {
    const params = JSON.stringify(user_to_register);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post(`${this.url}register`, params, {headers: headers}).pipe(map( res => res.json() ));
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
    return this.token;
  }

  update_user(user_to_update) {
    const params = JSON.stringify(user_to_update);
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization' : this.getToken() });

    return this._http.put(`${this.url}updateUser/${user_to_update._id}`, params, {headers: headers}).pipe(map( res => res.json() ));

  }

  isAuth() {
   if ( this.getIdentity() !== null ) {
     return true;
   } else {
     return false;
   }
  }
}
