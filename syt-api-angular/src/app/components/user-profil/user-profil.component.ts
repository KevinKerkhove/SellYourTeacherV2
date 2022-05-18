import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

import jwt_decode from 'jwt-decode';
import { AnnonceService } from 'src/app/service/annonce.service';
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
  annonces:any;
  emptyAnnonces:any;
  professors:any;
  
  keyword1:any;
  keyword2:any;
  
  constructor(private userService : UserService, private annonceService: AnnonceService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.userData = jwt_decode(this.token);
      this.getUserData();
      this.getEmptyAnnonce();
      this.getAnnonce();
      this.getProfessors();

    } 
  }

  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  getEmptyAnnonce(){
    this.annonceService.getAnnonceUserEmpty(this.userData.user_id).subscribe(res => {
      this.emptyAnnonces = res;
    });
  }

  getAnnonce(){
    this.annonceService.getAnnonceUserComplete(this.userData.user_id).subscribe(res => {
      this.annonces = res;
    });
  }

  getProfessors(){
    this.userService.getProfessorData().subscribe(res => {
      this.professors = res;
    });
  }

}
