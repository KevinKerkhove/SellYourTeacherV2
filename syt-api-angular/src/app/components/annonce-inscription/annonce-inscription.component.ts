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

  constructor(private route:ActivatedRoute, private userService:UserService, private annonceService:AnnonceService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.userData = jwt_decode(this.token);
      this.getUserData();
    }

    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.annonceService.getAnnonceById(this.id).subscribe(res => {
      //console.log(res);
      this.data = res;
      this.annonce = this.data;
    });
  }

  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  inscriptionAnnonce(annonce_id:any, user_id:any) {
    this.annonceService.inscriptionAnnonce(annonce_id, user_id).subscribe(res => {
      this.router.navigate(['/annonce/id'])
    })
  }



}
