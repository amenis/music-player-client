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

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', 'Null');
  }

  ngOnInit() {

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
            this._userService.login( this.user, 'true' ).subscribe(
              // tslint:disable-next-line:no-shadowed-variable
              response => {
                const token = response.token;
                this.token = token;
                if ( this.token.length <= 0 ) {
                  alert( 'el token no se ha generado correctamente' );
                } else {
                  // create element in localstorage to get the user session and token to send to every request
                  console.log(this.token);
                  console.log('identity ', this.identity);
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

}

