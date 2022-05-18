import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Annonce } from 'src/app/annonce';
import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css']
})
export class AnnonceCreateComponent implements OnInit {
  token :any;
  user: any;
  userData: any;
  form:FormGroup;
  submitted = false;
  data:any;

  constructor(private formBuilder:FormBuilder, private userService:UserService, private annonceService:AnnonceService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if(this.token){
      this.userData = jwt_decode(this.token);
      this.getUserData();
    }
    this.createForm();

  }

  getUserData() {
    this.userService.getUserById(this.userData.user_id).subscribe(res => {
      this.user = res;
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      subject: [null, Validators.required],
      description: [null, Validators.required],
      grade: [null, Validators.required],
      date: [null, Validators.required],
      duration: [null, [Validators.required]],
      hourly_price: [null, [Validators.required]],
        
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(user_id:any) {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    this.annonceService.insertAnnonceData(user_id, this.form.value).subscribe(res => {
      this.data = res;
      if(this.data['status'] === 1) {
        return this.router.navigate(['annonces']);
      } else {
        return;
      }
    });
    this.submitted = false;
    this.form.reset();
    
    
  }

}