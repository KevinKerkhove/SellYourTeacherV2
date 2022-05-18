import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';

import { AnnonceService } from 'src/app/service/annonce.service';
import { UserService } from 'src/app/service/user.service';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  form: FormGroup;
  data: any;
  token: any;

  constructor(private userService: UserService, private annonceService: AnnonceService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm();
  }

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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

    this.userService.login(this.form.value).subscribe(res => {
      this.data = res;
      //console.log(res);
      if(this.data['status'] === 1) {
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['annonces'])
          .then(() => {
            window.location.reload();
          });
      }
      else if(this.data['status'] === 0) {
        return;
      }
    })
  }

}
