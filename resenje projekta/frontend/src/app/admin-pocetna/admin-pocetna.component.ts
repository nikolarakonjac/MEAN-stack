import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Korisnik } from '../models/korisnik';
import { KorisniciService } from '../services/korisnici.service';
import { Router } from '@angular/router';
import { Firma } from '../models/firma';


@Component({
  selector: 'app-admin-pocetna',
  templateUrl: './admin-pocetna.component.html',
  styleUrls: ['./admin-pocetna.component.css']
})
export class AdminPocetnaComponent {


  constructor(private adminServis: AdminService, private korisniciServis: KorisniciService, private router: Router){}

  ngOnInit():void{

    this.korisniciServis.dohvatiSveKorisnikeNaCekanju().subscribe(
      data => {
        if(data){
          this.korisniciNaCekanju = data
        }
      }
    )

    this.korisniciServis.dohvatiSveVlasnike().subscribe(
      data => {
        if(data){
          this.vlasnici = data
        }
      }
    )

    this.korisniciServis.dohvatiSveDekoratere().subscribe(
      data => {
        if(data){
          this.dekorateri = data
        }
      }
    )

    this.adminServis.dohvatiSveFirme().subscribe(
      data => {
        if(data){
          this.firme = data
        }
      }
    )

  }


  korisniciNaCekanju: Korisnik[] = []
  vlasnici: Korisnik[] = []
  dekorateri: Korisnik[] = []
  firme: Firma[] = []


  prihvatiZahtev(k: Korisnik){
    this.adminServis.prihvatiZahtev(k.korisnickoIme).subscribe(
      data => {
        //ucitaju se ponovo zahtevi na cekanju jer je neki dodat ili odbijen
        this.korisniciServis.dohvatiSveKorisnikeNaCekanju().subscribe(
          data => {
            if(data){
              this.korisniciNaCekanju = data
            }
          }
        )

      }
    )

    

  }

  odbijZahtev(k: Korisnik){
    this.adminServis.odbijZahtev(k.korisnickoIme).subscribe(
      data => {

        this.korisniciServis.dohvatiSveKorisnikeNaCekanju().subscribe(
          data => {
            if(data){
              this.korisniciNaCekanju = data
            }
          }
        )
        
      }
    )
  }

  azuriraj(v: Korisnik){
    localStorage.setItem("korisnikZaAzuriranje", JSON.stringify(v))
    this.router.navigate(["adminAzuriraProfilKorisnika"])
  }

  deaktiviraj(k: Korisnik){
    this.korisniciServis.deaktivirajKorisnika(k.korisnickoIme).subscribe(
      data => {
        if(data.poruka == "ok"){

          // ponovo dohvati sve vlasnike jer se deaktivirani korisnik prebacuje u tabelu za korisnike na cekanje i menja mu se status
          this.korisniciServis.dohvatiSveVlasnike().subscribe(
            data => {
              if(data){
                this.vlasnici = data
              }
            }
          )

        }
      }
    )
  }


  dodajDekoratera(){
    this.router.navigate(["dodajDekoratera"])
  }

  dodajNovuFirmu(){
    this.router.navigate(["dodajFirmu"])
  }

  

}
