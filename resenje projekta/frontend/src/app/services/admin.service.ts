import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Poruka } from '../models/poruka';
import { Firma } from '../models/firma';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  adminLogin(korisnickoIme: string, lozinka: string){
    const data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }
    return this.http.post<Korisnik>("http://localhost:4000/admin/login", data)
  }


  prihvatiZahtev(korIme: string){
    const data ={
      korisnickoIme: korIme
    }
    return this.http.post<Poruka>("http://localhost:4000/admin/prihvatiZahtev", data)
  }


  odbijZahtev(korIme: string){
    const data = {
      korisnickoIme: korIme
    }
    return this.http.post<Poruka>("http://localhost:4000/admin/odbijZahtev", data)
  }


  dodajFirmu(firma: Firma){
    return this.http.post<Poruka>("http://localhost:4000/admin/dodajFirmu", firma)
  }
  

  dohvatiSveFirme(){
    return this.http.get<Firma[]>("http://localhost:4000/admin/dohvatiSveFirme") 
  }

}
