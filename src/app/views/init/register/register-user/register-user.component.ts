import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  alertRegister;
  user_register: User;

  constructor(private _userService: UserService, private route: Router) {
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', 'Null');
   }

  ngOnInit() {
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
          this.route.navigate(['/login']);
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
