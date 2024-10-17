import { Component, OnInit } from '@angular/core';
import { ZakazanoUredjivanjeBaste } from '../models/zakazanoUredjivanjeBaste';
import { KorisniciService } from '../services/korisnici.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graf3',
  templateUrl: './graf3.component.html',
  styleUrls: ['./graf3.component.css']
})
export class Graf3Component implements OnInit {
  sviZakazaniPoslovi: ZakazanoUredjivanjeBaste[] = [];

  constructor(private korisnikServis: KorisniciService) {
    Chart.register(...registerables); // Register Chart.js components
  }

  ngOnInit() {
    this.korisnikServis.dohvatiSveZakazanePoslove().subscribe(
      data => {
        this.sviZakazaniPoslovi = data;
        this.drawHistogram();
      }
    );
  }

  drawHistogram() {
    // Parse job data into the required format
    const jobDates = this.sviZakazaniPoslovi.map(job => new Date(job.datumZakazivanja));

    // Filter jobs from the last 24 months
    const twoYearsAgo = new Date();
    twoYearsAgo.setMonth(twoYearsAgo.getMonth() - 24);
    const filteredJobs = jobDates.filter(date => date >= twoYearsAgo);

    // Count jobs per weekday
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdayCounts = Array(7).fill(0);  // Initialize array for weekdays

    filteredJobs.forEach(date => {
      const day = date.getDay();  // Sunday is 0, Monday is 1, etc.
      weekdayCounts[day]++;
    });

    // Calculate the average per month (assuming 24 months)
    const averageWeekdayCounts = weekdayCounts.map(count => count / 24);

    // Create the chart
    new Chart('histogramCanvas', {
      type: 'bar',
      data: {
        labels: weekdays,
        datasets: [{
          label: 'Prosecan broj poslova',
          data: averageWeekdayCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Prosecan broj poslova za mesec dana'
            }
          },
          x: {
            title: {
              display: true,
              text: 'dani u nedelji'
            }
          }
        }
      }
    });
  }
}
