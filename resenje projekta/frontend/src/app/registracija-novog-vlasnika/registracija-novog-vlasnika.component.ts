import { Component } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-registracija-novog-vlasnika',
  templateUrl: './registracija-novog-vlasnika.component.html',
  styleUrls: ['./registracija-novog-vlasnika.component.css']
})
export class RegistracijaNovogVlasnikaComponent {

  constructor(private korisniciServis: KorisniciService, private router: Router){}

  ngOnInit(): void{

  }


  korisnik: Korisnik = new Korisnik();
  errorMessageProfilePicture: string = ""
  errorMessagePassword: string = ""
  errorMessageCardNumber: string = ""
  errorMessageTelefon: string = ""
  errorMessageMejl: string = ""
  errorMessageDuringLogin: string = ""
  cardType: string = ""
  defaultProfilePicturePath = "assets/defaultProfilePicture.png"
  fileUploaded: Boolean = false

  validateCreditCard(cardNumber: string): boolean {
    
    const dinersRegex = /^(300|301|302|303|36|38)\d{12}$/;
   
    const masterCardRegex = /^(51|52|53|54|55)\d{14}$/;
    
    const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;

    if (dinersRegex.test(cardNumber)) {
      this.cardType = 'diners';
      return true;
    } else if (masterCardRegex.test(cardNumber)) {
      this.cardType = 'mastercard';
      return true;
    } else if (visaRegex.test(cardNumber)) {
      this.cardType = 'visa';
      return true;
    } else {
      this.cardType = "";
      return false;
    }
  }

  
  onFileSelected(event: any): void {
    this.fileUploaded = true
    const file: File = event.target.files[0];

    if (file) {
      const allowedImageTypes = ['image/jpg', 'image/png'];
      if (!allowedImageTypes.includes(file.type)) {
        this.errorMessageProfilePicture = 'Slika mora biti u formatu JPG ili PNG.';
        return; 
    }
      
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        
        if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
          this.korisnik.profilnaSlika = file;
          this.errorMessageProfilePicture = ""; 
        } else {
          this.errorMessageProfilePicture = 'Slika mora biti između 100x100 i 300x300 piksela.'; 
        }

        
        URL.revokeObjectURL(img.src);
      };
    }
  }

  
  onSubmit(): void {
    if(!this.validatePassword(this.korisnik.lozinka)){
      this.errorMessagePassword = "Lozinka mora imati minimalno 6 karaktera, maksimalno 10 karaktera, bar jedno veliko slovo, tri mala slova, jedan broj i jedan specijalni karakter, i mora počinjati slovom."
      return
    }
    this.errorMessagePassword = ""

    if (!this.validateCreditCard(this.korisnik.kreditnaKartica)) {
      this.errorMessageCardNumber = 'Broj kreditne kartice nije validan.';
      return;
    }
    this.errorMessageCardNumber = ""

    // if (!this.korisnik.profilnaSlika) {
    //   this.korisnik.profilnaSlika = new File(
    //     [this.defaultProfilePicturePath], // Dummy data; actual default image should be on the server
    //     'defaultProfilePicture.png',
    //     { type: 'image/png' }
    //   );
    // }
    if(!this.fileUploaded){
      this.korisnik.profilnaSlika = null
    }
    this.errorMessageProfilePicture = ""

    if (!this.validatePhoneNumber(this.korisnik.telefon)) {
      this.errorMessageTelefon = 'Telefon mora imati tačno 10 cifara ili mora počinjati sa + i imati tačno 12 cifara.';
      return;
    }
    this.errorMessageTelefon = ""
    
    if (!this.validateEmail(this.korisnik.mejl)) {
      this.errorMessageMejl = 'Uneta mejl adresa nije validna.';
      return;
    }
    this.errorMessageMejl = ""

    //alert("prosao provere")

    this.korisniciServis.registrujNovogVlasnika(this.korisnik).subscribe(
      data=>{
        if(data.poruka === "ok"){
          this.router.navigate(["login"])
          this.errorMessageDuringLogin = ""
        }
        else if (data.poruka == "korisnicko ime nije jedinstveno"){
          this.errorMessageDuringLogin = "korsnicko ime mora biti jedinstveno"
        }
        else if(data.poruka == "mejl nije jedinstven"){
          this.errorMessageDuringLogin = "mejl mora biti jedinstven"
        }
        else{
          alert("greska pri registraciji novog korisnika")
        }
      }
    )
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^(\d{10}|\+\d{12})$/;
    return phoneRegex.test(phoneNumber);
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
