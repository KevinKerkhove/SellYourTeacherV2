import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';

import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';

@Component({
  selector: 'app-annonce-edit',
  templateUrl: './annonce-edit.component.html',
  styleUrls: ['./annonce-edit.component.css']
})
export class AnnonceEditComponent implements OnInit {

  id:any;
  data:any;
  annonce = new Annonce();
  constructor(private route:ActivatedRoute, private userService:UserService, private annonceService:AnnonceService, private router: Router) { }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id']; // récupère l'id qui est dans l'url
    this.getData();// récupère les données de l'annonce que l'on veut modifier
  }

  // fonction qui récupère les données de l'annonce grâce à l'id
  getData() {
    this.annonceService.getAnnonceById(this.id).subscribe(res => {
      //console.log(res);
      this.data = res;
      this.annonce = this.data;
    });
  }

  // fonction qui permet d'envoyer l'annonce  modifié au back-end
  updateAnnonce() {
    this.annonceService.updateAnnonceData(this.id, this.annonce).subscribe(res => {
      this.router.navigate(['/annonces'])
    })
  }

}
