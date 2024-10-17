import { Component } from '@angular/core';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';
import { VlasnikService } from '../services/vlasnik.service';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zakazivanja',
  templateUrl: './zakazivanja.component.html',
  styleUrls: ['./zakazivanja.component.css']
})
export class ZakazivanjaComponent {
  constructor(private vlasnikServise: VlasnikService, private router: Router){}


  ngOnInit():void{

    let x = localStorage.getItem("ulogovaniKorisnik")
    if(x){
      this.ulogovaniKorisnik = JSON.parse(x)
    }

    this.vlasnikServise.dohvatiSvaZakazivanjaZaKorisnika(this.ulogovaniKorisnik.korisnickoIme).subscribe(
      data => {
        if(data){
          this.zakazivanja = data

          this.zakazivanja.forEach(z =>{
            z.datumRadova = new Date(z.datumRadova)
            z.datumZakazivanja = new Date(z.datumZakazivanja)
          })

        }
        else{
          alert("nema")
        }
      }
    )
  }

  ulogovaniKorisnik: Korisnik = new Korisnik()
  zakazivanja: ZakazanoUredjivanjeBaste[] = []


  odjaviSe(){
    localStorage.removeItem("ulogovaniKorisnik")
    this.router.navigate(["login"])
  }

} 
