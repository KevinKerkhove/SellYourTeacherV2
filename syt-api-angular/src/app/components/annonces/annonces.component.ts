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
  annonces:any;
  annonce = new Annonce();
  token:any;
  userData:any;
  user:any;
  data:any;
  constructor(private userService:UserService, private annonceService:AnnonceService, private router:Router) { }

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

  deleteData(id:any) {
    this.annonceService.deleteAnnonceData(id).subscribe(res => {
      this.getAnnoncesData();
    })
  }

  inscriptionAnnonce(annonce_id:any, user_id:any){
    this.annonceService.inscriptionAnnonce(annonce_id, user_id);
    this.router.navigate(['annonces'])
    .then(() => {
      window.location.reload();
    });
  }

} 
