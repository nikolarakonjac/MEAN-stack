import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisniciService } from '../services/korisnici.service';
import { VlasnikService } from '../services/vlasnik.service';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';
import { Firma } from '../models/firma';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private korisnikServis: KorisniciService, private vlasnikServis: VlasnikService){}

  ngOnInit():void{
    this.korisnikServis.dohvatiSveVlasnike().subscribe(
      data => {
        if(data){
          this.vlasnici = data

          this.brVlasnika = this.vlasnici.length
        }
      }
    )

    this.korisnikServis.dohvatiSveDekoratere().subscribe(
      data => {
        if(data){
          this.dekorateri = data
          this.brDekoratera = this.dekorateri.length
        }
      }
    )

    this.vlasnikServis.dohvatiSveDekorisaneBaste().subscribe(
      data => {
        this.dekorisaneBaste = data
        this.brDekorisanihBasti = this.dekorisaneBaste.length
      }
    )

    this.korisnikServis.dohvatiSveZakazanePoslove().subscribe(
      data => {
        this.sviZakazaniPoslovi = data

        this.calculateJobCounts();
      }
    )

    this.korisnikServis.dohvatiSveFirme().subscribe(
      data => {
        if(data){
          this.firme = data
        }
      }
    )

  }


  sviZakazaniPoslovi: ZakazanoUredjivanjeBaste[] = []

  brDekorisanihBasti: number = 0
  dekorisaneBaste: ZakazanoUredjivanjeBaste[] = []

  brVlasnika: number = 0
  brDekoratera: number = 0
  vlasnici: Korisnik[] = []
  dekorateri: Korisnik[] = []

  brojZakazanihPoslova24h: number = 0
  brojZakazanihPoslova7Dana: number = 0
  brojZakazanihPoslova30Dana: number = 0

  firme: Firma[] = []
  pretraziNazivFirmeParam: string = ""
  pretraziAdresuFirmeParam: string = ""


  calculateJobCounts(): void {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - (24 * 60 * 60 * 1000)); // 24 hours ago
    const last7Days = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago
    const last30Days = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)); // 30 days ago

    // Count jobs in the last 24 hours
    this.brojZakazanihPoslova24h = this.sviZakazaniPoslovi.filter(job => {
      const datumZakazivanja = new Date(job.datumZakazivanja); // Convert to Date
      return datumZakazivanja >= last24Hours && datumZakazivanja <= now;
    }).length;

    // Count jobs in the last 7 days
    this.brojZakazanihPoslova7Dana = this.sviZakazaniPoslovi.filter(job => {
      const datumZakazivanja = new Date(job.datumZakazivanja); // Convert to Date
      return datumZakazivanja >= last7Days && datumZakazivanja <= now;
    }).length;

    // Count jobs in the last 30 days
    this.brojZakazanihPoslova30Dana = this.sviZakazaniPoslovi.filter(job => {
      const datumZakazivanja = new Date(job.datumZakazivanja); // Convert to Date
      return datumZakazivanja >= last30Days && datumZakazivanja <= now;
    }).length;
  }


  pretrazi(){

    this.korisnikServis.dohvatiSveFirme().subscribe(
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

}
