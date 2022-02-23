import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-annonce-edit',
  templateUrl: './annonce-edit.component.html',
  styleUrls: ['./annonce-edit.component.css']
})
export class AnnonceEditComponent implements OnInit {

  id:any;
  data:any;
  annonce = new Annonce();
  constructor(private route:ActivatedRoute, private dataService:DataService, private router: Router) { }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params['id']);
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.dataService.getAnnonceById(this.id).subscribe(res => {
      //console.log(res);
      this.data = res;
      this.annonce = this.data;
    });
  }

  updateAnnonce() {
    this.dataService.updateData(this.id, this.annonce).subscribe(res => {
      this.router.navigate(['/annonces'])
    })
  }

}
