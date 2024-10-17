import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaNovogVlasnikaComponent } from './registracija-novog-vlasnika/registracija-novog-vlasnika.component';
import { VlasnikPocetnaComponent } from './vlasnik-pocetna/vlasnik-pocetna.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilVlasnikaComponent } from './profil-vlasnika/profil-vlasnika.component';
import { AzuriranjeProfilaVlasnikaComponent } from './azuriranje-profila-vlasnika/azuriranje-profila-vlasnika.component';
import { ZakazivanjaComponent } from './zakazivanja/zakazivanja.component';
import { FirmeComponent } from './firme/firme.component';
import { OdrzavanjaComponent } from './odrzavanja/odrzavanja.component';
import { DodajDekorateraComponent } from './dodaj-dekoratera/dodaj-dekoratera.component';
import { DodajFirmuComponent } from './dodaj-firmu/dodaj-firmu.component';
import { DekoraterPocetnaComponent } from './dekorater-pocetna/dekorater-pocetna.component';
import { ProfilDekorateraComponent } from './profil-dekoratera/profil-dekoratera.component';
import { AzurirajProfilDekorateraComponent } from './azuriraj-profil-dekoratera/azuriraj-profil-dekoratera.component';
import { DetaljiFirmeComponent } from './detalji-firme/detalji-firme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ZakazivanjaDekoraterComponent } from './zakazivanja-dekorater/zakazivanja-dekorater.component';
import { OdrzavanjaDekoraterComponent } from './odrzavanja-dekorater/odrzavanja-dekorater.component';
import { StatistikaDekoraterComponent } from './statistika-dekorater/statistika-dekorater.component';
import { Graf1Component } from './graf1/graf1.component';
import { Graf2Component } from './graf2/graf2.component';
import { Graf3Component } from './graf3/graf3.component';
import { HomeComponent } from './home/home.component';
import { AdminAzuriraProfilKorisnikaComponent } from './admin-azurira-profil-korisnika/admin-azurira-profil-korisnika.component';



@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    RegistracijaNovogVlasnikaComponent,
    VlasnikPocetnaComponent,
    AdminPocetnaComponent,
    AdminLoginComponent,
    PromenaLozinkeComponent,
    ProfilVlasnikaComponent,
    AzuriranjeProfilaVlasnikaComponent,
    ZakazivanjaComponent,
    FirmeComponent,
    OdrzavanjaComponent,
    DodajDekorateraComponent,
    DodajFirmuComponent,
    DekoraterPocetnaComponent,
    ProfilDekorateraComponent,
    AzurirajProfilDekorateraComponent,
    DetaljiFirmeComponent,
    ZakazivanjaDekoraterComponent,
    OdrzavanjaDekoraterComponent,
    StatistikaDekoraterComponent,
    Graf1Component,
    Graf2Component,
    Graf3Component,
    HomeComponent,
    AdminAzuriraProfilKorisnikaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
