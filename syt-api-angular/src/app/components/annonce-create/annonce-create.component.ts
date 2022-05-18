import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css']
})
export class AnnonceCreateComponent implements OnInit {
  token :any;
  user: any;
  userData: any;
  form:FormGroup;
  submitted = false;
  data:any;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private annonceService:AnnonceService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token'); // on récupère le token dans le localstorage
    if(this.token){// si il est différent de null(donc un utilisateur est connecté)
      this.userData = jwt_decode(this.token);//on récupère les info stocké dans le token
      this.getUserData();// on récupère les données de l'utilisateurs connecté
    }
    this.createForm();// initialise le formulaire

  }

  // fonction qui permet de récupèrer les données d'un utilisateur grâce à l'id
  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  // fonction qui permet de créer un form group avec des validators
  createForm() {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      subject: [null, Validators.required],
      description: [null, Validators.required],
      grade: [null, Validators.required],
      date: [null, Validators.required],
      duration: [null, [Validators.required]],
      hourly_price: [null, [Validators.required]],
        
    });
  }


  get f() {
    return this.form.controls;
  }

  // function qui permet d'envoyer le formulaire si il est valide
  submit(user_id:any) {
    this.submitted = true;// submitted car le formulaire est envoyé
    if(this.form.invalid) {
      return; // si le formulaire est invalid on return
    }

    // on utilise la fonction du Service annonce qui permet d'envoyer des données au back-end
    this.annonceService.insertAnnonceData(user_id, this.form.value).subscribe(res => {
      this.data = res; //on récupère le résultat 
      if(this.data['status'] === 1) { // si le status est à 1 on renvoie vers les annonces car l'annonce à été créer
        return this.router.navigate(['annonces']);
      } else {
        return;
      }
    });
    this.submitted = false; // on remet submitted à false car l'envoie est terminé
    this.form.reset(); // on reset le formulaire
    
    
  }

}