import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DekoraterService } from '../services/dekorater.service';
import { Korisnik } from '../models/korisnik';
import { DekoraterPrihvaceniPoslovi } from '../models/dekoraterPrihvaceniPoslovi';

@Component({
  selector: 'app-graf1',
  templateUrl: './graf1.component.html',
  styleUrls: ['./graf1.component.css']
})
export class Graf1Component {

  @ViewChild('barChart', { static: true }) barChart: ElementRef<HTMLCanvasElement> | undefined;

  dekorater: Korisnik = new Korisnik();
  posloviZaDekoratera: DekoraterPrihvaceniPoslovi = new DekoraterPrihvaceniPoslovi();
  
  // Array to store months
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  constructor(private dekoraterServis: DekoraterService) {}

  ngOnInit(): void {
    const x = localStorage.getItem("ulogovaniKorisnik");
    if (x) {
      this.dekorater = JSON.parse(x);
    }

    // Fetch the data
    this.dekoraterServis.dohvatiPrihvacenePoslove(this.dekorater.korisnickoIme).subscribe(
      data => {
        if (data) {
          this.posloviZaDekoratera = data;
          this.processJobData(this.posloviZaDekoratera.poslovi);
        }
      },
      error => {
        console.error('Error fetching jobs data', error);
      }
    );
  }

  // Process job data to count jobs by month
  processJobData(jobs: any[]): void {
    const jobCountsByMonth: { [month: string]: number } = {};

    // Initialize the jobCountsByMonth with all months and set initial value to 0
    this.months.forEach(month => {
      jobCountsByMonth[month] = 0;
    });

    // Process the jobs and count how many jobs are done in each month
    jobs.forEach(job => {
      const date = new Date(job.datumRadova);
      const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
      
      if (jobCountsByMonth[month] !== undefined) {
        jobCountsByMonth[month]++;
      }
    });

    // Draw the chart with months and job counts
    this.drawChart(this.months, Object.values(jobCountsByMonth));
  }

  // Draw the chart using the Canvas API
  drawChart(labels: string[], data: number[]): void {
    if (this.barChart == null) return;
    const canvas = this.barChart.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('Canvas rendering context not available.');
      return;
    }

    const chartWidth = canvas.width;
    const chartHeight = canvas.height;
    const barWidth = chartWidth / data.length * 0.7;
    const maxDataValue = Math.max(...data);
    const padding = 40;

    ctx.clearRect(0, 0, chartWidth, chartHeight);

    // Draw the bars and display job counts
    data.forEach((value, index) => {
      const barHeight = (value / maxDataValue) * (chartHeight - padding);
      const barX = (index + 0.1) * barWidth + index * 20;
      const barY = chartHeight - barHeight - padding;

      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(barX, barY, barWidth, barHeight);

      // Add the label below each bar
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(labels[index], barX + barWidth / 2, chartHeight - 10);

      // Add the job count on top of each bar
      ctx.fillText(value.toString(), barX + barWidth / 2, barY - 5);
    });
  }

}
