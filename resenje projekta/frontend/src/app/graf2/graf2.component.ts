import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { DekoraterService } from '../services/dekorater.service';
import { DekoraterPrihvaceniPoslovi } from '../models/dekoraterPrihvaceniPoslovi';

@Component({
  selector: 'app-graf2',
  templateUrl: './graf2.component.html',
  styleUrls: ['./graf2.component.css']
})
export class Graf2Component implements OnInit {

  @ViewChildren('pieChart') pieCharts: QueryList<ElementRef<HTMLCanvasElement>> | undefined;

  prihvaceniPoslovi: DekoraterPrihvaceniPoslovi[] = [];
  companyJobDistribution: { [key: string]: { [decorator: string]: number } } = {};

  constructor(private dekoraterServis: DekoraterService) { }

  ngOnInit(): void {
    // Fetch the data
    this.dekoraterServis.dohvatiSvePrihvacenePoslove().subscribe(data => {
      if (data) {
        this.prihvaceniPoslovi = data;
        this.processJobData();
      }
    });
  }

  processJobData(): void {
    // Group jobs by company and count decorators
    this.prihvaceniPoslovi.forEach(dekorater => {
      const korisnickoImeDekoratera = dekorater.korisnickoImeDekoratera;

      dekorater.poslovi.forEach(posao => {
        const nazivFirme = posao.nazivFirme;

        // Initialize the company in the object if not already present
        if (!this.companyJobDistribution[nazivFirme]) {
          this.companyJobDistribution[nazivFirme] = {};
        }

        // Initialize the decorator in the company object if not already present
        if (!this.companyJobDistribution[nazivFirme][korisnickoImeDekoratera]) {
          this.companyJobDistribution[nazivFirme][korisnickoImeDekoratera] = 0;
        }

        // Increment the job count for the decorator under the company
        this.companyJobDistribution[nazivFirme][korisnickoImeDekoratera]++;
      });
    });

    // Wait for view to initialize, then draw pie charts
    setTimeout(() => {
      this.drawPieCharts();
    }, 0);
  }

  drawPieCharts(): void {
    const companies = Object.keys(this.companyJobDistribution);

    // Loop through the canvas elements and companies to draw each pie chart
    this.pieCharts?.forEach((chart, index) => {
      const company = companies[index];
      this.drawPieChart(chart.nativeElement, company);
    });
  }

  drawPieChart(canvas: HTMLCanvasElement, company: string): void {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas rendering context not available.');
      return;
    }

    // Prepare the data for the pie chart
    const decorators = Object.keys(this.companyJobDistribution[company]);
    const jobCounts = Object.values(this.companyJobDistribution[company]);

    const totalJobs = jobCounts.reduce((acc, count) => acc + count, 0);
    const colors = ['#4CAF50', '#FF5722', '#FFC107', '#03A9F4', '#E91E63'];

    let startAngle = 0;
    jobCounts.forEach((count, index) => {
      const sliceAngle = (count / totalJobs) * 2 * Math.PI;

      // Draw the pie chart slice
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2), startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      // Add label in the middle of the slice
      const labelX = canvas.width / 2 + (Math.cos(startAngle + sliceAngle / 2) * (canvas.width / 4));
      const labelY = canvas.height / 2 + (Math.sin(startAngle + sliceAngle / 2) * (canvas.height / 4));
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(`${decorators[index]}: ${count}`, labelX, labelY);

      // Move the starting angle for the next slice
      startAngle += sliceAngle;
    });
  }

  // Helper method to get company names
  getCompanyNames(): string[] {
    return Object.keys(this.companyJobDistribution);
  }
}
