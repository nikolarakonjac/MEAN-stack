import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firma } from '../models/firma';
import { Usluga } from '../models/usluga';
import { Korisnik } from '../models/korisnik';
import { KorisniciService } from '../services/korisnici.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dodaj-firmu',
  templateUrl: './dodaj-firmu.component.html',
  styleUrls: ['./dodaj-firmu.component.css']
})
export class DodajFirmuComponent {
  constructor(private router: Router, private korisniciServis: KorisniciService, private adminServis: AdminService){}


  ngOnInit():void{
    this.korisniciServis.dohvatiSlobodneDekoratere().subscribe(
      data => {
        if(data){
          this.slobodniDekorateri = data
        }
      }
    )
  }

  firma: Firma = new Firma()
  error: string = ""
  errorDodajUslugu: string = ""
  errorDodajDekoratera: string = ""
  nazivUsluge: string = ""
  cenaUsluge: string = ""
  trenutneUsluge: Usluga[] = []
  datumPocetakGodisnjeg: string = "YYYY-MM-DD"
  datumKrajGodisnjeg: string = "YYYY-MM-DD"
  dekorateri: Korisnik[] = [] 
  slobodniDekorateri: Korisnik[] = []


  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^(\d{10}|\+\d{12})$/
    return phoneRegex.test(phoneNumber)
  }

  onSubmit(){
    if (!this.validatePhoneNumber(this.firma.kontaktOsobaTelefon)) {
      this.error = "Telefon mora imati tačno 10 cifara ili mora počinjati sa + i imati tačno 12 cifara"
      return;
    }
    this.error = ""

    if(this.trenutneUsluge.length == 0){
      this.error = "Firma mora da ima makar jednu uslugu"
      return
    }
    this.error = ""

    this.firma.usluge = this.trenutneUsluge

    if(!this.isValidDateFormat(this.datumPocetakGodisnjeg) || !this.isValidDateFormat(this.datumKrajGodisnjeg)){
      this.error = "datumi nisu u dobrom formatu"
      return
    }
    this.error = ""

    this.firma.pocetakGodisnjeg = new Date(this.datumPocetakGodisnjeg)
    this.firma.krajGodisnjeg = new Date(this.datumKrajGodisnjeg)


    if(this.dekorateri.length < 2){
      this.error = "Minimalan broj dekoratera u firmi je 2"
      return
    }
    this.error = ""

    this.firma.dekorateri = this.dekorateri

    this.adminServis.dodajFirmu(this.firma).subscribe(
      data => {
        if(data.poruka == "ok"){
          
        }
        else{
          alert("nije ok")
        }
      }
    )

  }

  dodajUslugu(){
    if(this.nazivUsluge == "" || this.cenaUsluge == ""){
      this.errorDodajUslugu = "morate popuniti sva polja"
      return
    }
    let novaUsluga = new Usluga()
    novaUsluga.naziv = this.nazivUsluge
    novaUsluga.cena = Number(this.cenaUsluge)
    this.trenutneUsluge.push(novaUsluga)
  }

  isValidDateFormat(dateString: string): Boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(dateString)) {
      return false;
    }
    
    const date = new Date(dateString);
    const [year, month, day] = dateString.split("-").map(Number);

    
    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 && // Months are zero-indexed
        date.getDate() === day
    );

  }
 

  dodaj(d: Korisnik){
    if(this.dekorateri.find(k => k.korisnickoIme === d.korisnickoIme)){
      this.errorDodajDekoratera = "ovaj dekorater je vec dodat"
      return
    }
    this.dekorateri.push(d)
  }
}
