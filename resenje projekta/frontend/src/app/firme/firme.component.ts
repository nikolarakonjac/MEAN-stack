import { Component } from '@angular/core';
import { Firma } from '../models/firma';
import { KorisniciService } from '../services/korisnici.service';
import { VlasnikService } from '../services/vlasnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-firme',
  templateUrl: './firme.component.html',
  styleUrls: ['./firme.component.css']
})
export class FirmeComponent {
  constructor(private korisniciServis: KorisniciService, private vlasnikServis: VlasnikService, private router: Router){}

  ngOnInit(): void{
    this.korisniciServis.dohvatiSveFirme().subscribe(
      data => {
        if(data){
          this.firme = data
        }
      }
    )
  }

  firme: Firma[] = []
  pretraziNazivFirmeParam: string = ""
  pretraziAdresuFirmeParam: string = ""

  pretrazi(){

    this.korisniciServis.dohvatiSveFirme().subscribe(
      sveFirme => {
        if(sveFirme){
          this.firme = this.vlasnikServis.pretragaFirmi(this.pretraziNazivFirmeParam, this.pretraziAdresuFirmeParam, sveFirme)
        }
        else{
          this.firme = this.vlasnikServis.pretragaFirmi(this.pretraziNazivFirmeParam, this.pretraziAdresuFirmeParam, [])
        }
      }
    )
  }

  sortirajFirmeNeopadajucePoNazivu(){
    this.firme = this.vlasnikServis.sortirajFirmeNeopadajucePoNazivu(this.firme)
  }

  sortirajFirmeNerastucePoNazivu(){
    this.firme = this.vlasnikServis.sortirajFirmeNerastucePoNazivu(this.firme)
  }


  sortirajFirmeNeopadajucePoAdresi(){
    this.firme = this.vlasnikServis.sortirajFirmeNeopadajucePoAdresi(this.firme)
  }

  sortirajFirmeNerastucePoAdresi(){
    this.firme = this.vlasnikServis.sortirajFirmeNerastucePoAdresi(this.firme)
  }

  otvoriDeteljeFirme(f: Firma){
    localStorage.setItem("firma", JSON.stringify(f))
    this.router.navigate(["detaljiFirme"])
  }
  

  odjaviSe(){
    localStorage.removeItem("ulogovaniKorisnik")
    this.router.navigate(["login"])
  }

}
