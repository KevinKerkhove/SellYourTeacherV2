import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css']
})
export class AnnonceCreateComponent implements OnInit {
  annonce = new Annonce();
  annonces:any;
  constructor(private userService:UserService, private annonceService:AnnonceService, private router: Router) { }

  ngOnInit(): void {
    this.getAnnoncesData();
  }

  getAnnoncesData(){
    this.annonceService.getAnnonceData().subscribe(res => {
      this.annonces = res;
    });
  }
  
  insertData() {
    this.annonceService.insertAnnonceData(this.annonce).subscribe(res => {
      this.router.navigate(['/annonces'])
    });
  }

}