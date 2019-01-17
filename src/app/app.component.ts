import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'MUSIFY';
  public user: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister;
  public user_register: User;

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', 'Null');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', 'Null');
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmit() {
      // getting the user data
      this._userService.login( this.user ).subscribe(
        response => {
          const identity = response.user;
          this.identity = identity;
          if ( !this.identity._id ) {
            alert( 'El usuario no esta correctamente identificado' );
          } else {
            // create element in localStorage and save user data
            localStorage.setItem( 'identity', JSON.stringify(identity) );
            this._userService.login( this.user, 'true' ).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              response => {
                const token = response.token;
                this.token = token;
                if ( this.token.length <= 0 ) {
                  alert( 'el token no se ha generado correctamente' );
                } else {
                  // save token in localstorage
                  localStorage.setItem( 'token', JSON.stringify(token) );
                }
              },
              error => {
                // tslint:disable-next-line:prefer-const
                let errorMessage = <any>error;
                if ( errorMessage != null ) {
                  const body  = JSON.parse(error._body);
                  this.errorMessage = body.message;
                  console.log(error);
                }
              }
            );

          }
        },
        error => {
          // tslint:disable-next-line:prefer-const
          let errorMessage = <any>error;
          if ( errorMessage != null ) {
            const body  = JSON.parse(error._body);
            this.errorMessage = body.message;
            console.log(error);
          }
        }
    );
  }

  logout() {
    // remove data of localstorage
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

  onSubmitRegister() {
    this._userService.register(this.user_register).subscribe(
      response => {
        const user = response.user;
        this.user_register = user;
        if ( !user._id) {
          this.alertRegister = 'Error al crear el registro';
        } else {
          this.alertRegister = 'El usuario a sido creado exitosamente';
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', 'Null');
        }
      },
      error => {
        const errorMessage = <any>error;
        if ( errorMessage != null ) {
          const body  = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);
        }
      }
    );
  }
}

