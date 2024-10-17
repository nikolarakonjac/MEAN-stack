import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';
import { VlasnikService } from '../services/vlasnik.service';
import { Basta } from '../models/basta';
import { PrivatnaBasta } from '../models/privatnaBasta';
import { BastaRestorana } from '../models/bastaRestorana';
import { Servis } from '../models/servis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-odrzavanja',
  templateUrl: './odrzavanja.component.html',
  styleUrls: ['./odrzavanja.component.css']
})
export class OdrzavanjaComponent {
  constructor(private vlasnikServis: VlasnikService, private router: Router){}


  ngOnInit():void{
    let x = localStorage.getItem("ulogovaniKorisnik")
    if(x){
      this.korisnik = JSON.parse(x)
    }


    this.vlasnikServis.dohvatiSveZavrsenePoslove(this.korisnik.korisnickoIme).subscribe(
      data => {
        this.zavrseniPoslovi = data

        this.zavrseniPoslovi.forEach(x => x.datumRadova = new Date(x.datumRadova))

        this.zavrseniPoslovi = this.zavrseniPoslovi.map(posao => {
          if (this.isPrivatnaBasta(posao.basta)) {
            // Narrowed down to PrivatnaBasta
            posao.kvadratura = posao.basta.kvadraturaPodBazenom;
          } else if (this.isBastaRestorana(posao.basta)) {
            // Narrowed down to BastaRestorana
            posao.kvadratura = posao.basta.kvadraturaPodFontanom;
          }
          return posao;
        });


      }
    )

    this.vlasnikServis.dohvatiSvePosloveNaServisu(this.korisnik.korisnickoIme).subscribe(
      data => {
        this.posloviNaServisu = data
      }
    )

  }

  korisnik: Korisnik = new Korisnik()
  zavrseniPoslovi: ZakazanoUredjivanjeBaste[] = []
  zahtevZaServis: Servis = new Servis()
  posloviNaServisu: Servis[] = []


  hasSixMonthsPassed(datumRadova: Date): boolean {
    const sixMonthsInMillis = 6 * 30 * 24 * 60 * 60 * 1000; // Roughly 6 months in milliseconds
    const now = new Date().getTime(); // Current time in milliseconds
    const datumRadovaTime = new Date(datumRadova).getTime(); // datumRadova time in milliseconds

    // Check if the time difference is more than 6 months
    return now - datumRadovaTime > sixMonthsInMillis;
  }

  isPrivatnaBasta(basta: Basta): basta is PrivatnaBasta {
    return basta.tip === 'privatnaBasta';
  }
  
  // Type guard to check if basta is of type BastaRestorana
  isBastaRestorana(basta: Basta): basta is BastaRestorana {
    return basta.tip === 'bastaRestorana';
  }


  servis(z: ZakazanoUredjivanjeBaste){
    this.zahtevZaServis.korisnickoImeVlasnika = z.korisnickoImeVlasnika
    this.zahtevZaServis.nazivFirme = z.nazivFirme

    if (this.isPrivatnaBasta(z.basta)) {
      this.zahtevZaServis.kvadratura = z.basta.kvadraturaPodBazenom;
    } else if (this.isBastaRestorana(z.basta)) {
      this.zahtevZaServis.kvadratura = z.basta.kvadraturaPodFontanom;
    }
    
    this.zahtevZaServis.datumPodnosenjaZahteva = new Date()
    this.vlasnikServis.posaljiZahtevZaServis(this.zahtevZaServis).subscribe(
      data => {
        if(data.poruka == "ok"){
          this.vlasnikServis.dohvatiSvePosloveNaServisu(this.korisnik.korisnickoIme).subscribe(
            data => {
              this.posloviNaServisu = data

              

            }
          )
        }
        else{
          alert("nije ok")
        }
      }
    )
  }


  odjaviSe(){
    localStorage.removeItem("ulogovaniKorisnik")
    this.router.navigate(["login"])
  }

}
