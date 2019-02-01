import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public userEdit: User;
  public identity;
  public token;
  public errorMessage;

  constructor( private userService: UserService) {
    // this.userEdit = new User('', '' , '' , '' , '' , 'ROLE_USER' , '');
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.userEdit = this.identity;
  }

  ngOnInit() {
    console.log( this.userEdit.image );
  }

  onSubmit() {
    this.userService.update_user(this.userEdit).subscribe(
      response => {
        this.userEdit = response.user;
        if ( !response.user ) {
          this.errorMessage = 'el usuario no se ha actualizado';
        } else {
          this.userEdit = response.user;
          localStorage.setItem( 'identity', JSON.stringify(this.userEdit) );
        }
      },
       error => {
        const errorMessage = <any>error;
        if ( errorMessage != null ) {
          const body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(error);
        }
      }
    );
  }

}
