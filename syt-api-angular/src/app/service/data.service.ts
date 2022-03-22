import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  //fonction permettant de communiquer avec les fonctions qui permettent la gestion de données des annonces côté serveur
  getAnnonceData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/annonces');
  }

  insertAnnonceData(data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addAnnonce',data);
  }

  deleteAnnonceData(id:any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteAnnonce/' + id);
  }

  getAnnonceById(id:any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/annonce/' + id);
  }

  updateAnnonceData(id:any, data:any) {
    return this.httpClient.put('http://127.0.0.1:8000/api/updateAnnonce/' + id, data);
  }

  //fonction permettant de communiquer avec les fonctions qui permettent l'authentification (login/register)
  registerUser(data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/register', data);
  }

  login(data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/login', data);
  }

  //fonction permettant de communiquer avec les fonctions qui permettent la gestion des utilisateurs
  getUserById(id:any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/user/' + id);
  }

  getUserData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/users');
  }
}
