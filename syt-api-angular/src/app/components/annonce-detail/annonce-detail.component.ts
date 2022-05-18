import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/annonce';
import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AnnoncesComponent } from '../annonces/annonces.component';

import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {
  annonce_id: any;
  data: any;
  p_data: any;
  annonce = new Annonce();
  professor: any;
  user:any;
  userData:any;
  token:any;
  student:any;
  studentData:any;

  constructor(private userService:UserService, private annonceService:AnnonceService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');// récupère le token
    if(this.token){ // si token != null on le décode pour récupèrer l'id de l'utilisateur connecté
      this.userData = jwt_decode(this.token);
      this.getUserData();
    } 
    //console.log(this.route.snapshot.params['id']);
    this.annonce_id = this.route.snapshot.params['id']; // récupère l'id de l'annonce qui est dans l'url
    this.getAnnonceData(); //récupère l'annonce
    this.getProfessorData(); // récupère le professeur qui a créer l'annonce
    this.getstudentData(); // récupère l'étudiant qui est inscrit à l'annonce
  }
  
  //fonction qui permet de récupérer les donnée d'un utilisateur grâce à l'id (ici on récupère l'utilisateur connecté)
  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  //Récupère les données de l'annonce grâce à l'id qui se trouve dans l'url 
  getAnnonceData() {
    this.annonceService.getAnnonceById(this.annonce_id).subscribe(res => {
      this.data = res
      this.annonce = this.data
    });
  }

  //fonction qui permet de supprimer l'annonce
  deleteData(id:any) {
    this.annonceService.deleteAnnonceData(id).subscribe(res => {
      this.router.navigate(['annonces'])
    });
  }

  //fonction qui permet de récupérer les données du prof qui a créé l'annonce
  getProfessorData(){
    this.annonceService.getAnnonceProfessor(this.annonce_id).subscribe(res => {
      this.p_data = res
      this.professor = this.p_data
    });
  }
  //fonction qui permet de récupérer les données de l'étudiant inscrit à l'annonce
  getstudentData(){
    this.annonceService.getAnnonceStudent(this.annonce_id).subscribe(res => {
      this.studentData = res
      this.student = this.studentData
    });
  }
}
