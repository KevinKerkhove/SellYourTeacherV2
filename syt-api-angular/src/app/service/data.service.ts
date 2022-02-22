import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/annonces');
  }

  insertData(data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addAnnonce',data);
  }

  deleteData(id:any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteAnnonce/' + id);
  }

  getAnnonceById(id:any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/annonce/' + id);
  }

  updateData(id:any, data:any) {
    return this.httpClient.put('http://127.0.0.1:8000/api/updateAnnonce/' + id, data);
  }
}
