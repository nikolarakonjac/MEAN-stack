import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poruka } from '../models/poruka';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';
import { DekoraterPrihvaceniPoslovi } from '../models/dekoraterPrihvaceniPoslovi';
import { Servis } from '../models/servis';

@Injectable({
  providedIn: 'root'
})
export class DekoraterService {

  constructor(private http: HttpClient) { }


  pronadjiNazivFirmeUKojojRadiDekorater(korisnickoIme: string){
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<Poruka>("http://localhost:4000/korisnici/pronadjiNazivFirmeUKojojRadiDekorater", data)
  }

  dohvatiSvaNeobradjenaZakazivanjaZaFirmu(naziv: string){
    const data =  {
      naziv: naziv
    }
    return this.http.post<ZakazanoUredjivanjeBaste[]>("http://localhost:4000/korisnici/dohvatiSvaNeobradjenaZakazivanjaZaFirmu", data)
  }


  sortirajZahtevePoDatumu(zahtevi: ZakazanoUredjivanjeBaste[]){
    zahtevi.sort((a,b)=>{
      return b.datumZakazivanja.getTime() - a.datumZakazivanja.getTime()
    })

    return zahtevi
  }

  potvrdiZakazivanje(zahtev: ZakazanoUredjivanjeBaste, korisnickoImeDekoratera: string){
    const data = {
      zahtev: zahtev,
      korisnickoImeDekoratera: korisnickoImeDekoratera
    }
    return this.http.post<Poruka>("http://localhost:4000/korisnici/potvrdiZakazivanje", data)
  }


  odbijZahtev(zahtev: ZakazanoUredjivanjeBaste){
    return this.http.post<Poruka>("http://localhost:4000/korisnici/odbijZahtev", zahtev)
  }


  dohvatiPrihvacenePoslove(korisnickoIme: string){
    const data = {
      korisnickoIme: korisnickoIme
    }
    return this.http.post<DekoraterPrihvaceniPoslovi>("http://localhost:4000/korisnici/dohvatiPrihvacenePoslove", data)
  }

  zavrsiPosao(posao: ZakazanoUredjivanjeBaste, korisnickoImeDekoratera: string){
    const data = {
      posao: posao,
      korisnickoImeDekoratera: korisnickoImeDekoratera
    }
    return this.http.post<Poruka>("http://localhost:4000/korisnici/zavrsiPosao", data)
  }



  dohvatiSveZahteveZaServisZaFirmu(nazivFirme: string){
    const data = {
      nazivFirme: nazivFirme
    }
    return this.http.post<Servis[]>("http://localhost:4000/korisnici/dohvatiSveZahteveZaServisZaFirmu", data)
  }

  prihvatiZahtevZaServis(zahtevZaServis: Servis, korisnickoImeDekoratera: string){
    const data = {
      zahtevZaServis: zahtevZaServis,
      korisnickoImeDekoratera: korisnickoImeDekoratera
    }
    return this.http.post<Poruka>("http://localhost:4000/korisnici/prihvatiZahtevZaServis", data)
  }


  odbijZahtevZaServis(zahtevZaServis: Servis,  korisnickoImeDekoratera: string){
    const data = {
      zahtevZaServis: zahtevZaServis,
      korisnickoImeDekoratera: korisnickoImeDekoratera
    }
    return this.http.post<Poruka>("http://localhost:4000/korisnici/odbijZahtevZaServis", data)
  }


  dohvatiSvePrihvacenePoslove(){
    return this.http.get<DekoraterPrihvaceniPoslovi[]>("http://localhost:4000/korisnici/dohvatiSvePrihvacenePosloveZaSveDekoratere")
  }

}
