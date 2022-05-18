import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css']
})
export class AnnonceCreateComponent implements OnInit {
  token :any;
  annonce = new Annonce();
  annonces:any;
  user: any;
  userData: any;

  constructor(private userService:UserService, private annonceService:AnnonceService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.userData = jwt_decode(this.token);
      this.getUserData();
    }
    this.getAnnoncesData();

  }

  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  getAnnoncesData(){
    this.annonceService.getAnnonceData().subscribe(res => {
      this.annonces = res;
    });
  }
  
  insertData(user_id: any) {
    this.annonceService.insertAnnonceData(user_id, this.annonce).subscribe(res => {
      this.router.navigate(['/annonces'])
    });
  }

}