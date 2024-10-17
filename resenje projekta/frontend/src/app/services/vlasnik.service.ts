import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firma } from '../models/firma';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';
import { Servis } from '../models/servis';
import { Poruka } from '../models/poruka';

@Injectable({
  providedIn: 'root'
})
export class VlasnikService {

  constructor(private http: HttpClient) { }


  pretragaFirmi(naziv: string, adresa: string, firme: Firma[]){
    return firme.filter(firma => firma.naziv.includes(naziv) && firma.adresa.includes(adresa))
  }

 

  sortirajFirmeNeopadajucePoNazivu(firme: Firma[]){
    firme.sort((a,b) => {
      if(a.naziv < b.naziv) return -1
      else if(a.naziv >= b.naziv) return 1
      else return 0
    })
    return firme
  }

  sortirajFirmeNerastucePoNazivu(firme: Firma[]){
    firme.sort((a,b) => {
      if(a.naziv < b.naziv) return 1
      else if(a.naziv >= b.naziv) return -1
      else return 0
    })
    return firme
  }

  sortirajFirmeNeopadajucePoAdresi(firme: Firma[]){
    firme.sort((a,b) => {
      if(a.adresa < b.adresa) return -1
      else if(a.naziv >= b.naziv) return 1
      else return 0
    })
    return firme
  }

  sortirajFirmeNerastucePoAdresi(firme: Firma[]){
    firme.sort((a,b) => {
      if(a.adresa < b.adresa) return 1
      else if(a.naziv >= b.naziv) return -1
      else return 0
    })
    return firme
  }

  dohvatiSvaZakazivanjaZaKorisnika(korisnickoIme: string){
    const data ={
      korisnickoIme: korisnickoIme
    }
    return this.http.post<ZakazanoUredjivanjeBaste[]>("http://localhost:4000/korisnici/dohvatiSvaZakazivanjaZaKorisnika", data)
  }


  dohvatiSveZavrsenePoslove(korisnickoIme: string){
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<ZakazanoUredjivanjeBaste[]>("http://localhost:4000/korisnici/dohvatiSveZavrsenePoslove", data)
  }


  posaljiZahtevZaServis(zahtevZaServis: Servis){
    // const data = {
    //   zahtevZaServis: zahtevZaServis
    // }
    return this.http.post<Poruka>("http://localhost:4000/korisnici/posaljiZahtevZaServis", zahtevZaServis)
  }



  dohvatiSvePosloveNaServisu(korisnickoIme: string){
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Servis[]>("http://localhost:4000/korisnici/dohvatiSvePosloveNaServisu", data)
  }


  dohvatiSveDekorisaneBaste(){
    return this.http.get<ZakazanoUredjivanjeBaste[]>("http://localhost:4000/korisnici/dohvatiSveDekorisaneBaste")
  }


}
