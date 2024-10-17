import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  
  constructor(private adminServis: AdminService, private router: Router){}

  ngOnInit():void{

  }

  errorMessage: string = ""
  korisnickoIme: string = ""
  lozinka: string = ""
  


  prijavaNaSistem(){
    this.adminServis.adminLogin(this.korisnickoIme, this.lozinka).subscribe(
      data => {
        if(data){
          localStorage.setItem("ulogovaniAdmin", JSON.stringify(data))
          this.router.navigate(["adminPocetna"])
          this.errorMessage = ""
        }
        else{
          this.errorMessage = "uneti podaci nisu tacni"
        }
      }
    )
  }





}
