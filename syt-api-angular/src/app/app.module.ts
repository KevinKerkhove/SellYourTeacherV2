import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AnnonceEditComponent } from './components/annonce-edit/annonce-edit.component';


const appRoutes: Routes = [
  { path: '', component:AnnoncesComponent},
  { path: 'edit/:id', component:AnnonceEditComponent},
];



@NgModule({
  declarations: [
    AppComponent,
    AnnoncesComponent,
    NavbarComponent,
    AnnonceEditComponent
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
