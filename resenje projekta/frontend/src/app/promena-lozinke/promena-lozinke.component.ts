import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private router: Router, private korisniciServis: KorisniciService){}

  ngOnInit():void{

  }

  korisnickoIme: string = ""
  staraLozinka: string = ""
  novaLozinka1: string = ""
  novaLozinka2: string = ""
  error: string = ""

  promeniLozinku(){
    if(this.staraLozinka == "" || this.novaLozinka1 == "" || this.novaLozinka2 == "" || this.korisnickoIme == ""){
      this.error = "niste popunili sva polja"
    }
    else if(this.novaLozinka1 != this.novaLozinka2){
      this.error = "nova lozinka i ponovljena nova lozinka nisu iste"
    }
    else if(!this.validatePassword(this.novaLozinka1)){
      this.error = "Lozinka mora imati minimalno 6 karaktera, maksimalno 10 karaktera, bar jedno veliko slovo, tri mala slova, jedan broj i jedan specijalni karakter, i mora počinjati slovom."
    }
    else{
      this.error = ""

      this.korisniciServis.promeniLozinku(this.korisnickoIme, this.staraLozinka, this.novaLozinka1).subscribe(
        data => {
          if(data.poruka == "korisnik nije pronadjen"){
            this.error = "Ne postoji korisnik sa zadatim korisnickim imenom"
          }
          else if(data.poruka == "lozinka nije tacna"){
            this.error = "Stara lozinka nije tacna"
          }
          else if(data.poruka == "ok"){
            this.error = ""
            this.router.navigate(["login"])
          }
          else{
            this.error = "GRESKA PRI PROMENI LOZINKE"
          }
        }
      )

    }
  }

  validatePassword(password: string): boolean {
    
    const firstChar = password.charAt(0);
    const restOfPassword = password.slice(1); 

    if (!/^[A-Za-z]/.test(firstChar)) {
        return false; 
    }
    
    let passwordRegex = /""/

    if (/[a-z]/.test(firstChar)) {
        
        passwordRegex = /^(?=(?:.*[a-z]){2,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,9}$/;
    } else if (/[A-Z]/.test(firstChar)) {
        
        passwordRegex = /^(?=(?:.*[a-z]){3,})(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,9}$/;
    }

    return passwordRegex.test(restOfPassword);

  }

}
