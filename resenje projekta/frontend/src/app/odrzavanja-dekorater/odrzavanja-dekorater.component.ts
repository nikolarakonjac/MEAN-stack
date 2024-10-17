import { Component } from '@angular/core';
import { DekoraterService } from '../services/dekorater.service';
import { Korisnik } from '../models/korisnik';
import { Servis } from '../models/servis';
import { Router } from '@angular/router';

@Component({
  selector: 'app-odrzavanja-dekorater',
  templateUrl: './odrzavanja-dekorater.component.html',
  styleUrls: ['./odrzavanja-dekorater.component.css']
})
export class OdrzavanjaDekoraterComponent {
  constructor(private dekoraterServis: DekoraterService, private router:Router){}


  ngOnInit():void{
    let x = localStorage.getItem("ulogovaniKorisnik")
    if(x){
      this.dekorater = JSON.parse(x)

      this.dekoraterServis.pronadjiNazivFirmeUKojojRadiDekorater(this.dekorater.korisnickoIme).subscribe(
        data => {
          if(data.poruka){
            this.nazivFirme = data.poruka


            this.dekoraterServis.dohvatiSveZahteveZaServisZaFirmu(this.nazivFirme).subscribe(
              data => {
                if(data){
                  this.zahteviZaServis = data
                }
              }
            )

          }
        }
      )

    }

    

  }

  nazivFirme: string = ""
  dekorater: Korisnik = new Korisnik()
  zahteviZaServis: Servis[] = []
  prihvatiFlag: Boolean = false
  dateTimeValue: string = ""

  odjaviSe(){
    localStorage.removeItem("ulogovaniKorisnik")
    this.router.navigate(["login"])
  }

  prihvati(){
    this.prihvatiFlag = true
    
  }

  odbij(s: Servis){
    this.dekoraterServis.odbijZahtevZaServis(s, this.dekorater.korisnickoIme).subscribe(
      data => {
        if(data.poruka == "ok"){
          // alert("ok")

          this.dekoraterServis.dohvatiSveZahteveZaServisZaFirmu(this.nazivFirme).subscribe(
            data => {
              if(data){
                this.zahteviZaServis = data
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

  posalji(s: Servis){
    s.datumKrajaServisa = new Date(this.dateTimeValue)

    this.dekoraterServis.prihvatiZahtevZaServis(s, this.dekorater.korisnickoIme).subscribe(
      data => {
        if(data.poruka == "ok"){
          // alert("ok")

          this.dekoraterServis.dohvatiSveZahteveZaServisZaFirmu(this.nazivFirme).subscribe(
            data => {
              if(data){
                this.zahteviZaServis = data
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



}
