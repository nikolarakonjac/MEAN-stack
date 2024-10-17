import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Korisnik } from '../models/korisnik';



@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent {

  constructor(private korisniciServis: KorisniciService, private router: Router){}

  ngOnInit(): void{

  }


  korisnickoIme: string = ""
  lozinka: string = ""
  errorMessage: string = ""

  prijavaNaSistem(){
    this.korisniciServis.prijavaNaSistem(this.korisnickoIme, this.lozinka).subscribe(
      (data)=>{
        if(data == null){
          this.errorMessage = "podaci nisu tacni"
        }
        else if(data.status == "deaktiviran"){
          this.errorMessage = "Ovaj nalog je deaktiviran"
        }
        else if(data){
          this.errorMessage = ""
          localStorage.setItem("ulogovaniKorisnik", JSON.stringify(data))
          if(data.tipKorisnika == "vlasnik"){
            this.router.navigate(["profilVlasnika"])
          }
          else if(data.tipKorisnika == "dekorater"){
            this.router.navigate(["profilDekoratera"])
          }
          else{
            alert("greska pri login-u prijavaNaSistem")
          }
        }
        else{
          this.errorMessage = "greska"
        }
      }
    ),
    (error: { message: string; }) => {
      alert("Error occurred: " + error.message);
    }
  }

  registrujNovogVlasnika(){
      this.router.navigate(["registracijaVlasnika"])
  }

  promenaLozinke(){
    this.router.navigate(["promenaLozinke"])
  }

}
