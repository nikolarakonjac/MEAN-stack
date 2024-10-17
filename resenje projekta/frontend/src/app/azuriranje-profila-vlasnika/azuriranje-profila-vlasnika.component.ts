import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-azuriranje-profila-vlasnika',
  templateUrl: './azuriranje-profila-vlasnika.component.html',
  styleUrls: ['./azuriranje-profila-vlasnika.component.css']
})
export class AzuriranjeProfilaVlasnikaComponent {
  constructor(private router: Router, private korisnikServis: KorisniciService){}

  ngOnInit(): void {
    let x = localStorage.getItem("ulogovaniKorisnik");
    if (x) {
      this.ulogovaniKorisnik = JSON.parse(x);

      this.validateCreditCard(this.ulogovaniKorisnik.kreditnaKartica)

      if (this.ulogovaniKorisnik.profilnaSlika && this.isBufferObject(this.ulogovaniKorisnik.profilnaSlika)) {
        const bufferData = (this.ulogovaniKorisnik.profilnaSlika as any).data;
        this.profilnaSlikaURL = this.arrayBufferToBase64(bufferData); //ovo se koristi za prikazivanje slike na html-u
      }
    }
  }

  profilnaSlikaURL: string | null = null;
  ulogovaniKorisnik: Korisnik = new Korisnik()
  error: string = ""
  cardType: string = ""
  defaultProfilePicturePath = "assets/defaultProfilePicture.png"
  fileUploaded: boolean = false

  isBufferObject(obj: any): boolean {
    return obj && obj.type === 'Buffer' && Array.isArray(obj.data);
  }
  
  arrayBufferToBase64(buffer: number[]): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpeg;base64,' + window.btoa(binary);  // Adjust the MIME type if necessary
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^(\d{10}|\+\d{12})$/;
    return phoneRegex.test(phoneNumber);
  }

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
    const file: File = event.target.files ? event.target.files[0] : null;
  
    if (file) {
      const allowedImageTypes = ['image/jpg', 'image/png'];
      if (!allowedImageTypes.includes(file.type)) {
        this.error = "Slika mora biti u formatu JPG ili PNG.";
        return;
      }
  
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      img.onload = () => {
        const width = img.width;
        const height = img.height;
  
        if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
          this.ulogovaniKorisnik.profilnaSlika = file;
          this.error = ""; 
          this.profilnaSlikaURL = img.src; // Set new profile picture URL
        } else {
          this.error = "Slika mora biti između 100x100 i 300x300 piksela.";
        }
  
        URL.revokeObjectURL(img.src);
      };
    }
  }
  
  zavrsiAzuriranje(){
    
    if (!this.validateCreditCard(this.ulogovaniKorisnik.kreditnaKartica)) {
      this.error = "Broj kreditne kartice nije validan."
      return;
    }
    this.error = ""


    if (!this.validatePhoneNumber(this.ulogovaniKorisnik.telefon)) {
      this.error = "Telefon mora imati tačno 10 cifara ili mora počinjati sa + i imati tačno 12 cifara."
      return;
    }
    this.error = ""
    
    if (!this.validateEmail(this.ulogovaniKorisnik.mejl)) {
      this.error = "Uneta mejl adresa nije validna."
      return;
    }
    this.error = ""


    if(this.ulogovaniKorisnik.ime == "" || this.ulogovaniKorisnik.prezime == "" || this.ulogovaniKorisnik.adresa == ""){
      this.error = "polja ne smeju da budu prazna"
    }
    this.error = ""


    

    this.korisnikServis.azurirajProfil(this.ulogovaniKorisnik).subscribe(
      data => {
        if(data){
          localStorage.setItem("ulogovaniKorisnik", JSON.stringify(data))
          this.router.navigate(["profilVlasnika"])
        }
        else{
          alert("azuriranje nije uspelo")
        }
      }
    )
    
  }

}
