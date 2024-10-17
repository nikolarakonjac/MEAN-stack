import { Component } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-vlasnika',
  templateUrl: './profil-vlasnika.component.html',
  styleUrls: ['./profil-vlasnika.component.css']
})
export class ProfilVlasnikaComponent {

  

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

  profilnaSlikaURL: string | null = null;
  ulogovaniKorisnik: Korisnik = new Korisnik()
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
    this.router.navigate(["azuriranjeProfilaVlasnika"])
  }

  odjaviSe(){
    localStorage.removeItem("ulogovaniKorisnik")
    this.router.navigate(["login"])
  }

}
