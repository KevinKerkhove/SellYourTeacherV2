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
    this.loginForm();// créer le formulaire
  }

  // fonction qui créer un form group avec des validators
  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.form.controls;
  }

  // fonction qui envoie les données du formulaire au back-end
  submit() {
    this.submitted = true;// submitted à true car le form est envoyé
    if(this.form.invalid) {
      return;// si invalid on return
    }

    // on appelle la fonction login du servcie
    this.userService.login(this.form.value).subscribe(res => {
      this.data = res;
      //console.log(res);
      if(this.data['status'] === 1) {// si la connexion à réussi on stocke le token dans le local storage et on redirige vers la page des annonces
        this.token = this.data.data.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['annonces'])
          .then(() => {
            window.location.reload();
          });
      }
      else if(this.data['status'] === 0) {// sinon on return
        return;
      }
    })
  }

}
