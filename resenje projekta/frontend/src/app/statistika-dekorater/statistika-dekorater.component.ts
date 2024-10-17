import { Component} from '@angular/core';
import { DekoraterService } from '../services/dekorater.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-statistika-dekorater',
  templateUrl: './statistika-dekorater.component.html',
  styleUrls: ['./statistika-dekorater.component.css']
})
export class StatistikaDekoraterComponent  {

 
  
  constructor(private dekoraterServis: DekoraterService, private router: Router) {}

  ngOnInit(): void {
    const x = localStorage.getItem("ulogovaniKorisnik");
   
  }

  odjaviSe(){
    localStorage.removeItem("ulogovaniKorisnik")
    this.router.navigate(["login"])
  }

  
}
