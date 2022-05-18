import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  constructor(private httpClient: HttpClient) { }
  //fonction permettant de communiquer avec les fonctions qui permettent la gestion de données des annonces côté serveur
  getAnnonceData() {
    return this.httpClient.get(environment.apiUrl + '/annonces');
  }

  insertAnnonceData(user_id:any, data:any) {
    return this.httpClient.post(environment.apiUrl +'/addAnnonce/' + user_id ,data);
  }

  deleteAnnonceData(id:any) {
    return this.httpClient.delete(environment.apiUrl + '/deleteAnnonce/' + id);
  }

  getAnnonceById(id:any) {
    return this.httpClient.get(environment.apiUrl + '/annonce/' + id);
  }

  getLast6() {
    return this.httpClient.get(environment.apiUrl + '/annonces/last6');
  }

  getAnnonceProfessor(id:any) {
    return this.httpClient.get(environment.apiUrl + '/annonce/' + id + '/professor');
  }

  getAnnonceStudent(id:any) {
    return this.httpClient.get(environment.apiUrl + '/annonce/' + id + '/student');
  }

  updateAnnonceData(id:any, data:any) {
    return this.httpClient.put(environment.apiUrl + '/updateAnnonce/' + id, data);
  }

  inscriptionAnnonce(annonce_id:any,user_id: any){
    return this.httpClient.get(environment.apiUrl + '/annonce/' + annonce_id + '/inscription/' + user_id);
  }
}

