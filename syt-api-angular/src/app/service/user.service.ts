import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


  //fonction permettant de communiquer avec les fonctions qui permettent l'authentification (login/register)
  registerUser(data:any) {
    return this.httpClient.post(environment.apiUrl + '/register', data);
  }

  login(data:any) {
    return this.httpClient.post(environment.apiUrl + '/login', data);
  }

  //fonction permettant de communiquer avec les fonctions qui permettent la gestion des utilisateurs
  getUserById(id:any) {
    return this.httpClient.get(environment.apiUrl + '/user/' + id);
  }

  getUserData() {
    return this.httpClient.get(environment.apiUrl + '/users');
  }

  getProfessorData() {
    return this.httpClient.get(environment.apiUrl + '/professors');
  }
}
