import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private userData: string;
  private _id: string;
  constructor(
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute
            ) { }

  ngOnInit() {
   this.userData = JSON.parse(localStorage.getItem('identity'));
  }

  isAuth() {
    return this.userService.isAuth();
  }

  logout() {
    // remove data of localstorage
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.userData = '';
  }

}
