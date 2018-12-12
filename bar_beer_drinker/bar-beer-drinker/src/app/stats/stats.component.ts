import {Component, OnInit} from '@angular/core';
import {BarsService} from '../bars.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private barService: BarsService) {
    this.barService.getFrequentCounts().subscribe(
      data => {
        console.log(data);

        const bars = [];
        const counts = [];

        data.forEach(bar => {
          bars.push(bar.bar);
          counts.push(bar.frequentCount);
        });

        //  this.renderBeerChart(bars, counts);
      }
    );
  }

  ngOnInit() {
  }
}
