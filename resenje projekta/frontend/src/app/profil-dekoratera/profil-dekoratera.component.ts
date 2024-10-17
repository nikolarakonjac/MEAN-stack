import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-dekoratera',
  templateUrl: './profil-dekoratera.component.html',
  styleUrls: ['./profil-dekoratera.component.css']
})
export class ProfilDekorateraComponent {


  constructor(private router: Router){}

  ngOnInit(): void {
    let x = localStorage.getItem("ulogovaniKorisnik");
    if (x) {
      this.ulogovaniKorisnik = JSON.parse(x);

      if (this.ulogovaniKorisnik.profilnaSlika && this.isBufferObject(this.ulogovaniKorisnik.profilnaSlika)) {
        const bufferData = (this.ulogovaniKorisnik.profilnaSlika as any).data;
        this.profilnaSlikaURL = this.arrayBufferToBase64(bufferData);
      }
    }
  }

  ulogovaniKorisnik: Korisnik = new Korisnik()
  profilnaSlikaURL: string | null = null;
  defaultProfilePicturePath = "assets/defaultProfilePicture.png"


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

  azurirajProfil(){
    this.router.navigate(["azurirajProfilDekoratera"])
  }

  odjaviSe(){
    localStorage.removeItem("ulogovaniKorisnik")
    this.router.navigate(["login"])
  }

}
