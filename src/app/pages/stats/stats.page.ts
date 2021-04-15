import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { EntryModel } from 'src/app/models/entry.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  public buyData: ChartDataSets[];
  public sellData: any;
  public lineChartLabels: any;
  public lineChartOptions: (any & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [
        { display: false }
      ]
    }
  };
  public lineChartColors: any = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllData().subscribe((data: EntryModel[]) => {
      this.buyData = [
        {
          data: data.reverse().map(d => d.buy_price),
          label: 'Buy price',
          pointRadius: 0,
        }
      ];
      this.sellData = [
        {
          data: data.reverse().map(d => d.sell_price),
          label: 'Sell price',
          pointRadius: 0,
          borderColor: 'green'
        }
      ];
      this.lineChartLabels = data.reverse().map(d => d.date)
    });
  }

}
