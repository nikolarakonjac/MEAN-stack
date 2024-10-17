import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { DekoraterService } from '../services/dekorater.service';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';
import { DekoraterPrihvaceniPoslovi } from '../models/dekoraterPrihvaceniPoslovi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zakazivanja-dekorater',
  templateUrl: './zakazivanja-dekorater.component.html',
  styleUrls: ['./zakazivanja-dekorater.component.css']
})
export class ZakazivanjaDekoraterComponent {
  constructor(private dekoraterServis: DekoraterService, private router: Router){}

  ngOnInit():void{
    let x = localStorage.getItem("ulogovaniKorisnik")
    if(x){
      this.dekorater = JSON.parse(x)
    }

    this.dekoraterServis.pronadjiNazivFirmeUKojojRadiDekorater(this.dekorater.korisnickoIme).subscribe(
      data => {
        if(data){
          this.nazivFirmeUkojojDekoraterRadi = data.poruka
          
          this.dekoraterServis.dohvatiSvaNeobradjenaZakazivanjaZaFirmu(this.nazivFirmeUkojojDekoraterRadi).subscribe(
            data => {
              if(data){
                this.neobradjenaZakazivanjaZaFirmu = data

                this.neobradjenaZakazivanjaZaFirmu.forEach(x => {
                  x.datumRadova = new Date(x.datumRadova)
                  x.datumZakazivanja = new Date(x.datumZakazivanja)
                })


                this.neobradjenaZakazivanjaZaFirmu = this.dekoraterServis.sortirajZahtevePoDatumu(this.neobradjenaZakazivanjaZaFirmu)

              }
            }
          )

        }
      }
    )

    this.dekoraterServis.dohvatiPrihvacenePoslove(this.dekorater.korisnickoIme).subscribe(
      data => {
        if(data){
          this.prihvaceniPoslovi = data

          this.prihvaceniPoslovi.poslovi = this.prihvaceniPoslovi.poslovi.filter(x => x.status != "zavrsen")

          this.prihvaceniPoslovi.poslovi.forEach(x => {
            x.datumRadova = new Date(x.datumRadova)
            x.datumZakazivanja = new Date(x.datumZakazivanja)
          });
        }
      }
    )

  }

  neobradjenaZakazivanjaZaFirmu: ZakazanoUredjivanjeBaste[] = []
  nazivFirmeUkojojDekoraterRadi: string = ""
  dekorater: Korisnik = new Korisnik()
  UnosKomentaraFlag: Boolean = false
  prihvaceniPoslovi: DekoraterPrihvaceniPoslovi = new DekoraterPrihvaceniPoslovi()

  potvrdiZakazivanje(x: ZakazanoUredjivanjeBaste){
    this.dekoraterServis.potvrdiZakazivanje(x, this.dekorater.korisnickoIme).subscribe(
      data => {
        if(data.poruka == "ok"){
          this.dekoraterServis.dohvatiSvaNeobradjenaZakazivanjaZaFirmu(this.nazivFirmeUkojojDekoraterRadi).subscribe(
            data => {
              if(data){
                this.neobradjenaZakazivanjaZaFirmu = data
  
                this.neobradjenaZakazivanjaZaFirmu.forEach(x => {
                  x.datumRadova = new Date(x.datumRadova)
                  x.datumZakazivanja = new Date(x.datumZakazivanja)
                })
  
                this.neobradjenaZakazivanjaZaFirmu = this.dekoraterServis.sortirajZahtevePoDatumu(this.neobradjenaZakazivanjaZaFirmu)
  
              }
            }
          )
        }
        
      }
    )
  }
  


  odbijZakazivanje(){
    this.UnosKomentaraFlag = true
  }

  potvrdiOdbijanjeZahteva(zahtev: ZakazanoUredjivanjeBaste){
    this.dekoraterServis.odbijZahtev(zahtev).subscribe(
      data => {
        if(data.poruka == "ok"){
          this.dekoraterServis.dohvatiSvaNeobradjenaZakazivanjaZaFirmu(this.nazivFirmeUkojojDekoraterRadi).subscribe(
            data => {
              if(data){
                this.neobradjenaZakazivanjaZaFirmu = data
  
                this.neobradjenaZakazivanjaZaFirmu.forEach(x => {
                  x.datumRadova = new Date(x.datumRadova)
                  x.datumZakazivanja = new Date(x.datumZakazivanja)
                })
  
                this.neobradjenaZakazivanjaZaFirmu = this.dekoraterServis.sortirajZahtevePoDatumu(this.neobradjenaZakazivanjaZaFirmu)

              }
            }
          )
        }
      }
    )
  }


  zavrsiPosao(posao: ZakazanoUredjivanjeBaste){
    this.dekoraterServis.zavrsiPosao(posao, this.dekorater.korisnickoIme).subscribe(
      data => {
        if(data.poruka == "ok"){
          this.dekoraterServis.dohvatiPrihvacenePoslove(this.dekorater.korisnickoIme).subscribe(
            data => {
              if(data){
                this.prihvaceniPoslovi = data
      
                this.prihvaceniPoslovi.poslovi = this.prihvaceniPoslovi.poslovi.filter(x => x.status != "zavrsen")
      
                this.prihvaceniPoslovi.poslovi.forEach(x => {
                  x.datumRadova = new Date(x.datumRadova)
                  x.datumZakazivanja = new Date(x.datumZakazivanja)
                });
              }
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
