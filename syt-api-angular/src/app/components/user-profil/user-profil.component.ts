import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  token:any;
  userData:any;
  user:any;
  data:any;
  
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.userData = jwt_decode(this.token);
      this.getUserData();
    } 
  }

  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }
  

}
