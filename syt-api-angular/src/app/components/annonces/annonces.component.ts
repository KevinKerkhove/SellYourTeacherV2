import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AnnonceService } from 'src/app/service/annonce.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  keyword: string;
  annonces:any;
  annonce = new Annonce();
  token:any;
  userData:any;
  user:any;
  data:any;
  professors: any;
  constructor(private userService:UserService, private annonceService:AnnonceService, private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token'); // récupère le token dans les localstorage
    if(this.token){// si le token est différent de nul on le décode
      this.userData = jwt_decode(this.token);
      this.getUserData();// on récupère les donnée de l'utilisateur connecté
    } 
    this.getAnnoncesData();// récupère les annonces
    this.getProfessors();//récupère les professeur
  }

  // fonction qui vas chercher les données d'un utilisateur grâce à l'id du token
  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  // fonction qui récupère la liste des annonces
  getAnnoncesData(){
    this.annonceService.getAnnonceData().subscribe(res => {
      this.annonces = res;
    });
  }

  // fonction qui récupère la liste des professeur
  getProfessors(){
    this.userService.getProfessorData().subscribe(res => {
      this.professors = res;
    });
  }

} 
