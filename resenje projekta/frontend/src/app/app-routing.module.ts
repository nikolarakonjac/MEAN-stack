import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegistracijaNovogVlasnikaComponent } from './registracija-novog-vlasnika/registracija-novog-vlasnika.component';
import { VlasnikPocetnaComponent } from './vlasnik-pocetna/vlasnik-pocetna.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilVlasnikaComponent } from './profil-vlasnika/profil-vlasnika.component';
import { AzuriranjeProfilaVlasnikaComponent } from './azuriranje-profila-vlasnika/azuriranje-profila-vlasnika.component';
import { FirmeComponent } from './firme/firme.component';
import { ZakazivanjaComponent } from './zakazivanja/zakazivanja.component';
import { OdrzavanjaComponent } from './odrzavanja/odrzavanja.component';
import { DodajDekorateraComponent } from './dodaj-dekoratera/dodaj-dekoratera.component';
import { DodajFirmuComponent } from './dodaj-firmu/dodaj-firmu.component';
import { DekoraterPocetnaComponent } from './dekorater-pocetna/dekorater-pocetna.component';
import { ProfilDekorateraComponent } from './profil-dekoratera/profil-dekoratera.component';
import { AzurirajProfilDekorateraComponent } from './azuriraj-profil-dekoratera/azuriraj-profil-dekoratera.component';
import { DetaljiFirmeComponent } from './detalji-firme/detalji-firme.component';
import { ZakazivanjaDekoraterComponent } from './zakazivanja-dekorater/zakazivanja-dekorater.component';
import { OdrzavanjaDekoraterComponent } from './odrzavanja-dekorater/odrzavanja-dekorater.component';
import { StatistikaDekoraterComponent } from './statistika-dekorater/statistika-dekorater.component';
import { Graf1Component } from './graf1/graf1.component';
import { Graf2Component } from './graf2/graf2.component';
import { Graf3Component } from './graf3/graf3.component';
import { HomeComponent } from './home/home.component';
import { AdminAzuriraProfilKorisnikaComponent } from './admin-azurira-profil-korisnika/admin-azurira-profil-korisnika.component';

const routes: Routes = [
  {path: "login", component: PocetnaComponent},
  {path: "", component: HomeComponent},
  {path: "registracijaVlasnika", component: RegistracijaNovogVlasnikaComponent},
  {path: "vlasnikPocetna", component: VlasnikPocetnaComponent},
  {path: "adminPocetna", component: AdminPocetnaComponent},
  {path: "adminLogin", component: AdminLoginComponent},
  {path: "promenaLozinke", component: PromenaLozinkeComponent},
  {path: "profilVlasnika", component: ProfilVlasnikaComponent},
  {path: "azuriranjeProfilaVlasnika", component: AzuriranjeProfilaVlasnikaComponent},
  {path: "firme", component: FirmeComponent},
  {path: "zakazivanja", component: ZakazivanjaComponent},
  {path: "odrzavanje", component: OdrzavanjaComponent},
  {path: "dodajDekoratera", component: DodajDekorateraComponent},
  {path: "dodajFirmu", component: DodajFirmuComponent},
  {path: "dekoraterPocetna", component: DekoraterPocetnaComponent},
  {path: "profilDekoratera", component: ProfilDekorateraComponent},
  {path: "azurirajProfilDekoratera", component: AzurirajProfilDekorateraComponent},
  {path: "detaljiFirme", component: DetaljiFirmeComponent},
  {path: "zakazivanjaDekorater", component: ZakazivanjaDekoraterComponent},
  {path: "odrzavanjeDekorater", component: OdrzavanjaDekoraterComponent},
  {path: "statistikaDekorater", component: StatistikaDekoraterComponent},
  {path: "graf1", component: Graf1Component},
  {path: "graf2", component: Graf2Component},
  {path: "graf3", component: Graf3Component},
  {path: "adminAzuriraProfilKorisnika", component: AdminAzuriraProfilKorisnikaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
