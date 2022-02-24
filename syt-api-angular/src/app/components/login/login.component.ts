import { Component, OnInit } from '@angular/core';

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

  constructor(private dataService: DataService, private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router) { }

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

    this.dataService.login(this.form.value).subscribe(res => {
      this.data = res;
      //console.log(res);
      if(this.data['status'] === 1) {
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['annonces']);
        this.toastr.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
      else if(this.data['status'] === 0) {
        this.toastr.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code), {
          timeOut: 2000,
          progressBar: true
        });
      }
    })
  }

}
