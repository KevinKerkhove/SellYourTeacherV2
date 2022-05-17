import { Component, OnInit } from '@angular/core';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  annonces: any;
  token: any;
  user:any;
  userData:any;
  constructor(private annonceService:AnnonceService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.userData = jwt_decode(this.token);
      this.getUserData();
    } 
    this.getAnnoncesData();
  }

  getAnnoncesData(){
    this.annonceService.getLast6().subscribe(res => {
      this.annonces = res;
    });
  }

  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }
}
