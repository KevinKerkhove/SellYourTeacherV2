import { Component, OnInit } from '@angular/core';
import { Annonce } from 'src/app/annonce';
import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {
  annonce_id: any;
  data: any;
  p_data: any;
  annonce = new Annonce();
  professor: any;

  constructor(private userService:UserService, private annonceService:AnnonceService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    //console.log(this.route.snapshot.params['id']);
    this.annonce_id = this.route.snapshot.params['id'];
    this.getAnnonceData();
    this.getProfessorData();
  }

  getAnnonceData() {
    this.annonceService.getAnnonceById(this.annonce_id).subscribe(res => {
      this.data = res
      this.annonce = this.data
    });
  }

  getProfessorData(){
    this.annonceService.getAnnonceProfessor(this.annonce_id).subscribe(res => {
      this.p_data = res
      this.professor = this.p_data
    });
  }
}
