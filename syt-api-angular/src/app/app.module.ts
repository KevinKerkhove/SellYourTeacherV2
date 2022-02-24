import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnnonceEditComponent } from './components/annonce-edit/annonce-edit.component';
import { AnnonceCreateComponent } from './components/annonce-create/annonce-create.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth.guard';
import { UserProfilComponent } from './components/user-profil/user-profil.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  { path: 'annonces', component:AnnoncesComponent,
    canActivate: [AuthGuard]
  },

  {path: '', component: HomeComponent},

  { path: 'annonces/edit/:id', component:AnnonceEditComponent,
    canActivate: [AuthGuard]
  },

  { path: 'annonces/addAnnonce', component:AnnonceCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component:RegisterComponent},
  { path: 'login', component:LoginComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    AnnoncesComponent,
    NavbarComponent,
    AnnonceEditComponent,
    AnnonceCreateComponent,
    LoginComponent,
    RegisterComponent,
    UserProfilComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
