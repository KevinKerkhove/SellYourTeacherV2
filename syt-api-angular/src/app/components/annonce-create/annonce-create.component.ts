import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css']
})
export class AnnonceCreateComponent implements OnInit {
  annonce = new Annonce();
  annonces:any;
  constructor(private dataService:DataService, private router: Router) { }

  ngOnInit(): void {
    this.getAnnoncesData();
  }

  getAnnoncesData(){
    this.dataService.getAnnonceData().subscribe(res => {
      this.annonces = res;
    });
  }
  
  insertData() {
    this.dataService.insertAnnonceData(this.annonce).subscribe(res => {
      this.router.navigate(['/annonces'])
    });
  }

}