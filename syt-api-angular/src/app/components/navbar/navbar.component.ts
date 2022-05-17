import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;
  userData:any;
  email: any;
  user:any;
  data:any;

  constructor(private router: Router, private userService: UserService) { 
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login'])
          .then(() => {
            window.location.reload();
          });
  }

  getUser() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.data = res,
      this.user = new User(this.data.id, this.data.firstname, this.data.lastname, this.data.birthday, this.data.email, this.data.role_id)
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.userData = jwt_decode(this.token);
      this.email = this.userData.email;
      this.getUser();
    } 
  }
}
