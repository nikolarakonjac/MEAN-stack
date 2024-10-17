import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Poruka } from '../models/poruka';
import { Firma } from '../models/firma';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  constructor(private http: HttpClient) { }

  prijavaNaSistem(korisnickoIme: string, lozinka: string){
    const data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post<Korisnik>("http://localhost:4000/korisnici/prijavaNaSistem", data)
  }

  registrujNovogVlasnika(korisnik: Korisnik){

    const formData = new FormData()
    
    formData.append('korisnickoIme', korisnik.korisnickoIme)
    formData.append('lozinka', korisnik.lozinka)
    formData.append('ime', korisnik.ime)
    formData.append('prezime', korisnik.prezime)
    formData.append('pol', korisnik.pol)
    formData.append('adresa', korisnik.adresa)
    formData.append('telefon', korisnik.telefon)
    formData.append('mejl', korisnik.mejl)
    formData.append('kreditnaKartica', korisnik.kreditnaKartica)
    formData.append('tipKorisnika', korisnik.tipKorisnika)
    formData.append('status', korisnik.status)
    
    if (korisnik.profilnaSlika) {
      formData.append('profilnaSlika', korisnik.profilnaSlika);
    }

    return this.http.post<Poruka>("http://localhost:4000/korisnici/registrujNovogVlasnika", formData)
  }

  dodajNovogDekoratera(dekorater: Korisnik){
    const formData = new FormData()
    
    formData.append('korisnickoIme', dekorater.korisnickoIme)
    formData.append('lozinka', dekorater.lozinka)
    formData.append('ime', dekorater.ime)
    formData.append('prezime', dekorater.prezime)
    formData.append('pol', dekorater.pol)
    formData.append('adresa', dekorater.adresa)
    formData.append('telefon', dekorater.telefon)
    formData.append('mejl', dekorater.mejl)
    formData.append('kreditnaKartica', dekorater.kreditnaKartica)
    formData.append('tipKorisnika', dekorater.tipKorisnika)
    
    if (dekorater.profilnaSlika) {
      formData.append('profilnaSlika', dekorater.profilnaSlika);
    }

    return this.http.post<Poruka>("http://localhost:4000/korisnici/dodajNovogDekoratera", formData)
  }


  dohvatiSveKorisnikeNaCekanju(){
    return this.http.get<Korisnik[]>("http://localhost:4000/korisnici/dohvatiSveKorisnikeNaCekanju")
  }

  promeniLozinku(korisnickoIme: string, staraLozinka: string, novaLozinka: string){
    const data = {
      korisnickoIme: korisnickoIme,
      staraLozinka: staraLozinka,
      novaLozinka: novaLozinka
    }
    return this.http.post<Poruka>("http://localhost:4000/korisnici/promeniLozinku", data)
  }

  azurirajProfil(korisnik: Korisnik){
    const formData = new FormData()
    
    formData.append('korisnickoIme', korisnik.korisnickoIme)
    formData.append('lozinka', korisnik.lozinka)
    formData.append('ime', korisnik.ime)
    formData.append('prezime', korisnik.prezime)
    formData.append('pol', korisnik.pol)
    formData.append('adresa', korisnik.adresa)
    formData.append('telefon', korisnik.telefon)
    formData.append('mejl', korisnik.mejl)
    formData.append('kreditnaKartica', korisnik.kreditnaKartica)
    formData.append('tipKorisnika', korisnik.tipKorisnika)
    
    if (korisnik.profilnaSlika) {
      formData.append('profilnaSlika', korisnik.profilnaSlika);
    }

    return this.http.post<Korisnik>("http://localhost:4000/korisnici/azurirajProfil", formData)
  }


  dohvatiSveVlasnike(){
    return this.http.get<Korisnik[]>("http://localhost:4000/korisnici/dohvatiSveVlasnike")
  }

  dohvatiSveDekoratere(){
    return this.http.get<Korisnik[]>("http://localhost:4000/korisnici/dohvatiSveDekoratere")
  }

  deaktivirajKorisnika(korisnickoIme: string){
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Poruka>("http://localhost:4000/korisnici/deaktivirajKorisnika", data)
  }

  dohvatiSlobodneDekoratere(){
    return this.http.get<Korisnik[]>("http://localhost:4000/korisnici/dohvatiSlobodneDekoratere")
  }

  dohvatiSveFirme(){
    return this.http.get<Firma[]>("http://localhost:4000/korisnici/dohvatiSveFirme")
  }

  zakaziUredjivanjeBaste(zakazanoUredjivanjeBaste: ZakazanoUredjivanjeBaste){
    return this.http.post<Poruka>("http://localhost:4000/korisnici/zakaziUredjivanjeBaste", zakazanoUredjivanjeBaste)
  }


  dohvatiSveZakazanePoslove(){
    return this.http.get<ZakazanoUredjivanjeBaste[]>("http://localhost:4000/korisnici/dohvatiSveZakazanePoslove")
  }

}
