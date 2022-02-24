import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';



@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit {
  annonces:any;
  annonce = new Annonce();
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.getAnnoncesData();
  }

  getAnnoncesData(){
    this.dataService.getAnnonceData().subscribe(res => {
      this.annonces = res;
    });
  }

  deleteData(id:any) {
    this.dataService.deleteAnnonceData(id).subscribe(res => {
      this.getAnnoncesData();
    })
  }

} 
