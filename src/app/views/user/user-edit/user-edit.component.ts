import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userEdit = User;

  constructor( private UserService: UserService) { }

  ngOnInit() {
  }

}
