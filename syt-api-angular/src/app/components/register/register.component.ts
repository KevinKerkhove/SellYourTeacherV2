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
    this.createForm();// créer le formulaire
  }

  // créer un form group avec validators
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

  // focntion qui permet d'envoyer les données du form au back-end
  submit() {
    this.submitted = true;// form envoyé donc submitted = true
    if(this.form.invalid) {
      return;// si invalid on return
    }

    // on appel la fonction du service qui permet de créer un compte
    this.userService.registerUser(this.form.value).subscribe(res => {
      this.data = res;
      //console.log(res);
      if(this.data['status'] === 1) {
        return this.router.navigate(['annonces']);// si le compte est créer on redirige vers les annonces
      } else {
        return;// sinon on return
      }
    });
    this.submitted = false;// submitted = false car on termine l'envoie
    this.form.reset();// on reset le formulaire
    
    
  }
}
