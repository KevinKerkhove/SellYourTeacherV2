import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any;
  userData:any;
  email: any;
  user:any;
  data:any;

  constructor(private router: Router, private userService: UserService) { 
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');// récupère le token du localstorage
    if(this.token){// si il est différent de null on le décode et stocke les donnée dans userData
      this.userData = jwt_decode(this.token);
      this.email = this.userData.email;
      this.getUser();// récupère les données de l'utilisateur
    } 
  }


  // fonction qui permet de se déconnecté
  logout() {
    localStorage.removeItem('token'); // on supprime le token du local storage
    this.router.navigate(['login'])// on redirige vers la page de connexion
          .then(() => {
            window.location.reload();
          });
  }

  //récupère les donnée de l'utilisateur connecté grâce à l'id
  getUser() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.data = res,
      this.user = this.data
    });
  }

  
}
