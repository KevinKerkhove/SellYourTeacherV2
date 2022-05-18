import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/service/data.service';
import { UserService } from 'src/app/service/user.service';
import { AnnonceService } from 'src/app/service/annonce.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from 'src/app/confirmed.validator';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  submitted = false;
  data: any;
  ngSelect = 'Choose a Role';

  constructor(private formBuilder:FormBuilder, private userService: UserService, private annonceService: AnnonceService,  private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        birthday: [null, Validators.required],
        role_id: [null, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required],
    }, {
      validator: mustMatch('password', 'confirm_password')
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    this.userService.registerUser(this.form.value).subscribe(res => {
      this.data = res;
      //console.log(res);
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
