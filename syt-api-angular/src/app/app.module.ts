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
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: 'annonces', component:AnnoncesComponent},
  { path: 'annonces/edit/:id', component:AnnonceEditComponent},
  { path: 'annonces/addAnnonce', component:AnnonceCreateComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    AnnoncesComponent,
    NavbarComponent,
    AnnonceEditComponent,
    AnnonceCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
