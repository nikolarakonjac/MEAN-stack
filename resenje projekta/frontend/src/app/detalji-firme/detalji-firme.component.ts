import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Firma } from '../models/firma';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';
import { Korisnik } from '../models/korisnik';
import { PrivatnaBasta } from '../models/privatnaBasta';
import { BastaRestorana } from '../models/bastaRestorana';
import { KorisniciService } from '../services/korisnici.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-detalji-firme',
  templateUrl: './detalji-firme.component.html',
  styleUrls: ['./detalji-firme.component.css']
})
export class DetaljiFirmeComponent implements AfterViewInit{


  constructor(private fb: FormBuilder, private korisniciServis: KorisniciService, private router: Router){}

  ngOnInit(): void {

    let x = localStorage.getItem("firma");
    if (x) {
      this.firma = JSON.parse(x);

      if (this.firma.pocetakGodisnjeg) {
        this.firma.pocetakGodisnjeg = new Date(this.firma.pocetakGodisnjeg);
      }
      if (this.firma.krajGodisnjeg) {
        this.firma.krajGodisnjeg = new Date(this.firma.krajGodisnjeg);
      }

    }

    x = localStorage.getItem("ulogovaniKorisnik")
    if(x){
      this.ulogovaniVlasnik = JSON.parse(x)
    }

    // korak1
    this.korak1Form = this.fb.group({
      dateTime: ['', Validators.required], // Date and time picker
      ukupnaKvadratura: ['', [Validators.required, Validators.min(1)]], // Number field
      bastaType: ['', Validators.required] // Radio button selection
    })

    // korak2
    this.korak2PrivatnaBastaForm = this.fb.group({
      kvadraturaPodBazenom: ['', [Validators.required, Validators.min(0)]],
      kvadraturaPodZelenilom: ['', [Validators.required, Validators.min(0)]],
      kvadraturaPodLezaljkamaIStolovima: ['', [Validators.required, Validators.min(0)]],
      opis: ['']
    })

    this.korak2BastaRestoranaForm = this.fb.group({
      kvadraturaPodFontanom: ['', [Validators.required, Validators.min(0)]],
      kvadraturaPodZelenilom: ['', [Validators.required, Validators.min(0)]],
      brojStolova: ['', [Validators.required, Validators.min(0)]],
      brojStolica: ['', [Validators.required, Validators.min(0)]],
      opis: ['']
    })

  }

  ulogovaniVlasnik: Korisnik = new Korisnik()
  firma: Firma = new Firma()
  trenutniKorak: number = 0
  korak1Form: FormGroup = new FormGroup({})
  korak2PrivatnaBastaForm: FormGroup = new FormGroup({})
  korak2BastaRestoranaForm: FormGroup = new FormGroup({})
  tipIzabraneBaste: string = ""
  selektovaneUsluge: string[] = []
  errorKvadratiSeNeuklapaju: string = ""
  errorFirmaJeNaGodisnjem: string = ""
  zakazanoUredjivanje: ZakazanoUredjivanjeBaste = new ZakazanoUredjivanjeBaste()

  selectedGardenType: string = ""
  extractedData: any = null;
  prikaziCanvasFlag: Boolean = false
  uspenoSlanje: Boolean = false

  private ctx!: CanvasRenderingContext2D;
  
  @ViewChild('gardenCanvas', { static: false }) canvas: ElementRef<HTMLCanvasElement> | null = null;

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      // File reader event to process the file
      reader.onload = (e: any) => {
        try {
          // Parse the JSON file
          const jsonData = JSON.parse(e.target.result);
          
          // Extract data based on the selected garden type
          this.extractedData = this.extractData(jsonData);
          
        } catch (error) {
          console.error('Error parsing the JSON file:', error);
        }
      };

      // Read the uploaded file
      reader.readAsText(file);

    }
  }


  extractData(jsonData: any): any {
    if (this.selectedGardenType === 'privatnaBasta') {
      return {
        kvadraturaPodZelenilom: jsonData.kvadraturaPodZelenilom || 0,
        kvadraturaPodBazenom: jsonData.kvadraturaPodBazenom || 0,
        kvadraturaPodLezaljkamaIStolovima: jsonData.kvadraturaPodLezaljkamaIStolovima || 0
      };
    } else if (this.selectedGardenType === 'bastaRestorana') {
      return {
        kvadraturaPodFontanom: jsonData.kvadraturaPodFontanom || 0,
        kvadraturaPodZelenilom: jsonData.kvadraturaPodZelenilom || 0,
        brojStolica: jsonData.brojStolica || 0,
        brojStolova: jsonData.brojStolova || 0
      };
    } else {
      console.error('Invalid garden type selected');
      return null;
    }
  }

  onDrawButtonClick(): void {
    if (!this.extractedData) {
      console.error('No data to draw. Please upload a JSON file first.');
      return;
    }

    // Call the function to draw the garden layout on the canvas
    this.prikaziCanvasFlag = !this.prikaziCanvasFlag
    this.drawGarden(this.extractedData);
  }


  drawGarden(data: any): void {
    // Check if canvas and context are available
    if (!this.canvas || !this.ctx) {
      console.error('Canvas or context is not available.');
      return;
    }
  
    // Clear the canvas before drawing
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  
    let x = 50; // Starting X position for shapes
    let y = 50; // Starting Y position for shapes
  
    // Draw garden based on the selected type
    if (this.selectedGardenType === 'privatnaBasta') {
      
      // Draw multiple small green squares for `kvadraturaPodZelenilom`
      for (let i = 0; i < data.kvadraturaPodZelenilom; i++) {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(x, y, 20, 20);  // Small green square
        x += 30;  // Move the next square to the right
        if (x > this.canvas.nativeElement.width - 50) {
          x = 50;
          y += 30;
        }
      }
  
      // Reset position
      x = 50;
      y += 50;
  
      // Draw multiple big blue rectangles for `kvadraturaPodBazenom`
      for (let i = 0; i < data.kvadraturaPodBazenom; i++) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(x, y, 50, 30);  // Big blue rectangle
        x += 60;
        if (x > this.canvas.nativeElement.width - 60) {
          x = 50;
          y += 40;
        }
      }
  
      // Reset position
      x = 50;
      y += 50;
  
      // Draw multiple small grey rectangles for `kvadraturaPodLezaljkamaIStolovima`
      for (let i = 0; i < data.kvadraturaPodLezaljkamaIStolovima; i++) {
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(x, y, 20, 10);  // Small grey rectangle
        x += 30;
        if (x > this.canvas.nativeElement.width - 50) {
          x = 50;
          y += 20;
        }
      }
  
    } else if (this.selectedGardenType === 'bastaRestorana') {
  
      // Draw multiple big blue circles for `kvadraturaPodFontanom`
      for (let i = 0; i < data.kvadraturaPodFontanom; i++) {
        this.ctx.fillStyle = 'blue';
        this.drawCircle(x, y, 15);  // Big blue circle
        x += 40;
        if (x > this.canvas.nativeElement.width - 50) {
          x = 50;
          y += 40;
        }
      }
  
      // Reset position
      x = 50;
      y += 50;
  
      // Draw multiple small brown circles for `brojStolova`
      for (let i = 0; i < data.brojStolova; i++) {
        this.ctx.fillStyle = 'brown';
        this.drawCircle(x, y, 10);  // Small brown circle
        x += 30;
        if (x > this.canvas.nativeElement.width - 50) {
          x = 50;
          y += 30;
        }
      }
  
      // Reset position
      x = 50;
      y += 50;
  
      // Draw multiple small grey rectangles for `brojStolica`
      for (let i = 0; i < data.brojStolica; i++) {
        this.ctx.fillStyle = 'grey';
        this.ctx.fillRect(x, y, 15, 10);  // Small grey rectangle for chairs
        x += 20;
        if (x > this.canvas.nativeElement.width - 50) {
          x = 50;
          y += 20;
        }
      }
    }
  }

  // Helper function to draw a circle
  drawCircle(x: number, y: number, radius: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }


  nextStep(): void {
    
    if (this.trenutniKorak == 1 && this.korak1Form.valid) {
      if(this.daLiJeFirmaNaGodisnjem(new Date(this.korak1Form.get("dateTime")?.value))){
        this.errorFirmaJeNaGodisnjem = "firma je na godisnjem u zadatom periodu"
        return
      }
      this.errorFirmaJeNaGodisnjem = ""

      this.tipIzabraneBaste = this.korak1Form.get("bastaType")?.value
      this.trenutniKorak = 2;
    }
    else if(this.trenutniKorak == 2){
      this.trenutniKorak = 3
    }
  }

  prevStep(): void {
    if (this.trenutniKorak > 1) {
      this.trenutniKorak--;
    }
  }

  predajFormu() {

    if(this.tipIzabraneBaste == "privatnaBasta"){

      if(Number(this.korak1Form.get("ukupnaKvadratura")?.value ) < (
        Number(this.korak2PrivatnaBastaForm.get("kvadraturaPodBazenom")?.value ) + 
        Number(this.korak2PrivatnaBastaForm.get("kvadraturaPodZelenilom")?.value) +
        Number(this.korak2PrivatnaBastaForm.get("kvadraturaPodLezaljkamaIStolovima")?.value)
        )) {
        this.errorKvadratiSeNeuklapaju = "broj kvadrata pod bazenom, zelenilom i lezaljkama i stolovima mora biti jednak ili manji od ukupnog broja kvadrata"
        return
      }
      
      this.errorKvadratiSeNeuklapaju = ""

      this.zakazanoUredjivanje.basta = new PrivatnaBasta(
        Number(this.korak2PrivatnaBastaForm.get("kvadraturaPodBazenom")?.value),
        Number(this.korak2PrivatnaBastaForm.get("kvadraturaPodZelenilom")?.value),
        Number(this.korak2PrivatnaBastaForm.get("kvadraturaPodLezaljkamaIStolovima")?.value),
      )

      this.zakazanoUredjivanje.tipBaste = "privatnaBasta"
      this.zakazanoUredjivanje.opis = this.korak2PrivatnaBastaForm.get("opis")?.value
      
    }
    else{

      if(Number(this.korak1Form.get("ukupnaKvadratura")?.value ) < (
        Number(this.korak2BastaRestoranaForm.get("kvadraturaPodFontanom")?.value ) + 
        Number(this.korak2BastaRestoranaForm.get("kvadraturaPodZelenilom")?.value) 
        )) {
        this.errorKvadratiSeNeuklapaju = "broj kvadrata pod bastom i zelenilom ne moze biti veci od ukupnog broja kvadrata"
        return
      }
      
      this.errorKvadratiSeNeuklapaju = ""


      this.zakazanoUredjivanje.basta = new BastaRestorana(
        Number(this.korak2BastaRestoranaForm.get("kvadraturaPodFontanom")?.value),
        Number(this.korak2BastaRestoranaForm.get("kvadraturaPodZelenilom")?.value),
        Number(this.korak2BastaRestoranaForm.get("brojStolova")?.value),
        Number(this.korak2BastaRestoranaForm.get("brojStolica")?.value)
      )

      this.zakazanoUredjivanje.tipBaste = "bastaRestorana"
      this.zakazanoUredjivanje.opis = this.korak2BastaRestoranaForm.get("opis")?.value

    }


    this.zakazanoUredjivanje.datumZakazivanja = new Date()  //danasnji datum
    this.zakazanoUredjivanje.datumRadova = new Date(this.korak1Form.get("dateTime")?.value)
    this.zakazanoUredjivanje.izabraneUsluge = this.selektovaneUsluge
    this.zakazanoUredjivanje.korisnickoImeVlasnika = this.ulogovaniVlasnik.korisnickoIme
    this.zakazanoUredjivanje.nazivFirme = this.firma.naziv
    this.zakazanoUredjivanje.ukupnaKvadratura = Number(this.korak1Form.get("ukupnaKvadratura")?.value)


    this.korisniciServis.zakaziUredjivanjeBaste(this.zakazanoUredjivanje).subscribe(
      data => {
        if(data.poruka == "ok"){
          this.uspenoSlanje = true
        }
        else{
          alert("nije ok")
        }
      }
    )

    

  }

  odjaviSe(){
    localStorage.removeItem("ulogovaniKorisnik")
    this.router.navigate(["login"])
  }

  daLiJeFirmaNaGodisnjem(datum: Date): Boolean{
    const selectedDate = this.normalizeDate(datum);
    const pocetakGodisnjeg = this.normalizeDate(this.firma.pocetakGodisnjeg);
    const krajGodisnjeg = this.normalizeDate(this.firma.krajGodisnjeg);

    return selectedDate >= pocetakGodisnjeg && selectedDate <= krajGodisnjeg;
  }

  normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  zakaziUredjivanjeBaste() {
    this.trenutniKorak = 1;
  }

  onCheckboxChange(nazivUsluge:string , event: any){
    if (event.target.checked) {
      this.selektovaneUsluge.push(nazivUsluge);
    } else {
      this.selektovaneUsluge = this.selektovaneUsluge.filter(u => u !== nazivUsluge);
    }
  }




  

  

}
