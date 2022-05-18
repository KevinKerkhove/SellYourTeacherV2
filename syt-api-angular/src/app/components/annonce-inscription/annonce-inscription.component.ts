import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';

import jwt_decode from 'jwt-decode';

import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';

@Component({
  selector: 'app-annonce-inscription',
  templateUrl: './annonce-inscription.component.html',
  styleUrls: ['./annonce-inscription.component.css']
})
export class AnnonceInscriptionComponent implements OnInit {
  token: any;
  id:any;
  data:any;
  user: any;
  userData: any;
  annonce = new Annonce();
  professor: any;

  constructor(private route:ActivatedRoute, private userService:UserService, private annonceService:AnnonceService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token'); // récupère le token du local storage
    if(this.token){// si le token est différent de null, on le décode et on stocke les info dans userData
      this.userData = jwt_decode(this.token);
      this.getUserData();// récupère les données de l'utilisateur
      this.getProfessorData();
    }

    this.id = this.route.snapshot.params['id'];//récupère l'id de l'annonce dans l'url
    this.getData();// récupère les données de l'annonce
  }

  // récupère les données de l'annonce grâce à l'id
  getData() {
    this.annonceService.getAnnonceById(this.id).subscribe(res => {
      //console.log(res);
      this.data = res;
      this.annonce = this.data;
    });
  }

  //fonction qui permet de récupérer les données du prof qui a créé l'annonce
  getProfessorData(){
    this.annonceService.getAnnonceProfessor(this.id).subscribe(res => {
      this.professor = res
    });
  }

  //récupère les données de l'utilisateur connecté grâce a l'id trouvé dans le token
  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  // fonction qui permet d'inscire un étudiant à une annonce
  inscriptionAnnonce(annonce_id:any, user_id:any) {
    this.annonceService.inscriptionAnnonce(annonce_id, user_id).subscribe(res => {
      this.router.navigate(['/annonce/'+ annonce_id])
    })
  }



}
