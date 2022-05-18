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
    this.token = localStorage.getItem('token');// récupère le token dans le local storage
    if(this.token){// si != null on le décode et stocke ses données dans userData
      this.userData = jwt_decode(this.token);
      this.getUserData();//récupère les données de l'utilisateur connectés.
    } 
    this.getEmptyAnnonce();// récupère les annonce incomplète(pas d'étudiant inscrit )
    this.getAnnonce();// récupère les annonce complète
    this.getProfessors();// récupère les professeur
  }

  //récupère les données de l'utilisateur connectés.
  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  // récupère les annonce incomplète(pas d'étudiant inscrit) de l'utilisateur connecté 
  getEmptyAnnonce(){
    this.annonceService.getAnnonceUserEmpty(this.userData.user_id).subscribe(res => {
      this.emptyAnnonces = res;
    });
  }

  // récupère les annonce complète de l'utilisateur connecté
  getAnnonce(){
    this.annonceService.getAnnonceUserComplete(this.userData.user_id).subscribe(res => {
      this.annonces = res;
    });
  }

  // récupère les professeur
  getProfessors(){
    this.userService.getProfessorData().subscribe(res => {
      this.professors = res;
    });
  }

}
