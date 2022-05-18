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
  professors: any;
  constructor(private annonceService:AnnonceService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token'); // on récupère le token dans le local storage
    if(this.token){ // si il est différent de null, on décode le token et on stocke les données dans userData gra
      this.userData = jwt_decode(this.token);
      this.getUserData();// récupère les données de l'utilisateur
    } 
    this.getProfessors();// récupère les professeur
    this.getAnnoncesData();// récupère les 6 dernière annonces
  }

  // fonction qui récupère les 6 dernière annonces
  getAnnoncesData(){
    this.annonceService.getLast6().subscribe(res => {
      this.annonces = res;
    });
  }
  
  // Fonction qui récupère les données de l'utilisateur connecté
  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  // fonction qui récupère les professeur
  getProfessors(){
    this.userService.getProfessorData().subscribe(res => {
      this.professors = res;
    });
  }
}
