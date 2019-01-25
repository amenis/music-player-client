import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute
            ) { }

  ngOnInit() {
  }

  isAuth() {
    return this.userService.isAuth();
  }

}
