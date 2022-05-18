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

  // ajouter une annonce en base de données
  insertAnnonceData(user_id:any, data:any) {
    return this.httpClient.post(environment.apiUrl +'/addAnnonce/' + user_id ,data);
  }

  // supprime une annonce grâce à l'id
  deleteAnnonceData(id:any) {
    return this.httpClient.delete(environment.apiUrl + '/deleteAnnonce/' + id);
  }

  // récupère une annonce grâce à l'id
  getAnnonceById(id:any) {
    return this.httpClient.get(environment.apiUrl + '/annonce/' + id);
  }

  // récupère les 6 dernières annonces(page d'accueil)
  getLast6() {
    return this.httpClient.get(environment.apiUrl + '/annonces/last6');
  }

  // récupère le professeur d'une annonce
  getAnnonceProfessor(id:any) {
    return this.httpClient.get(environment.apiUrl + '/annonce/' + id + '/professor');
  }

   // récupère le professeur d'une annonce
  getAnnonceStudent(id:any) {
    return this.httpClient.get(environment.apiUrl + '/annonce/' + id + '/student');
  }

  // modification d'une annonce
  updateAnnonceData(id:any, data:any) {
    return this.httpClient.put(environment.apiUrl + '/updateAnnonce/' + id, data);
  }

  // inscription d'un étudiant à une annonce
  inscriptionAnnonce(annonce_id:any,user_id: any){
    return this.httpClient.get(environment.apiUrl + '/annonce/' + annonce_id + '/inscription/' + user_id);
  }

  //récupère les annonces avec un étudiant inscrit
  getAnnonceUserComplete(id:any) {
    return this.httpClient.get(environment.apiUrl + '/annonces/user/' + id);
  }

  //récupère les annonces avec aucun étudiant inscrit
  getAnnonceUserEmpty(id:any) {
    return this.httpClient.get(environment.apiUrl + '/annonces/user/' + id +'/empty');
  }




}

